// pages/api/auth/register.ts
import connectToDatabase from "@/server/config/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import AuthUser from "@/server/models/User";

const saltRounds = 10;

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, name, role } = req.body;

    // Validate if email, password, or name is empty
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Connect to the database
      await connectToDatabase();

      // Check if the user already exists
      const existingUser = await AuthUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create the new user
      const newUser = new AuthUser({
        email,
        passwordHash, // Save the hashed password
        name,
        role,
      });

      // Save the new user to the database
      await newUser.save();

      // Return success response
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default registerUser;
