// server/models/AuthUser.ts
import mongoose, { Document, Schema } from "mongoose";

interface IAuthUser extends Document {
  email: string;
  passwordHash: string; // Ensure this is the correct field
  name: string;
  role: string;
}

const AuthUserSchema = new Schema<IAuthUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // Make sure this is the hashed password
    name: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

// Use existing model if it exists, otherwise create it
const User =
  mongoose.models.AuthUsers ||
  mongoose.model<IAuthUser>("AuthUsers", AuthUserSchema);

export default User;
