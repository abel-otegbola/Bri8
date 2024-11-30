import { connectDB } from "@/lib/mongodb";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import NextAuth from "next-auth";

const handler = NextAuth({
        providers: [
          credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");
    
                if (!user) throw new Error("Email not registered");
    
                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
    
                if (!passwordMatch) throw new Error("Wrong Password");
                return user;
            },
          }),
        ],
        session: {
          strategy: "jwt",
        }
      }
);
export { handler as GET, handler as POST };