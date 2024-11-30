"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const register = async (values: { email: string, password: string, fullname: string, role: string }) => {
    const { email, password, fullname, role } = values;
    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          fullname,
          email,
          role,
          password: hashedPassword,
        });
        const savedUser = await user.save();
        console.log(savedUser, " saved succesfully")
    }
    catch(e){
        console.log(e);
    }
}