import { UserData } from "@/interface/profile";
import mongoose, { model, Schema } from "mongoose";

export interface UserDocument extends UserData {
    _id: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    fullname: {
      type: String,
      required: [true, "Name is required"]
    },
    role: {
      type: String,
      required: [true, "Role is required"]
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;