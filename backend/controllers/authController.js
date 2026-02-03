import user from "../models/user.js";
import jwt from "jsonwebtoken";
// register controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await user.create({
      name,
      email,
      password,
      role,
    });

    // Generate JWT token
    const jwtToken = newUser.generateAuthToken();
    // Set token in cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Set to false for development
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// login controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    existingUser.lastLogin = Date.now();
    await existingUser.save();
    // Generate JWT token
    const jwtToken = existingUser.generateAuthToken();
    // Set token in cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Set to false for development
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email, 
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
