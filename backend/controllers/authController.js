import user from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { clearAuthCookies, setAuthCookies } from "../utils/token.js";
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
      role: role || "donor",
    });

    // Generate tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    await newUser.setRefreshToken(refreshToken);
    await newUser.save();

    // Set tokens in cookies
    setAuthCookies(res, accessToken, refreshToken);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
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
    // Generate tokens
    const accessToken = existingUser.generateAccessToken();
    const refreshToken = existingUser.generateRefreshToken();
    await existingUser.setRefreshToken(refreshToken);
    await existingUser.save();

    // Set tokens in cookies
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email, 
        role: existingUser.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const existingUser = await user
      .findById(decoded.id)
      .select("+refreshTokenHash");
    if (!existingUser || !existingUser.refreshTokenHash) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    if (
      existingUser.refreshTokenExpires &&
      existingUser.refreshTokenExpires < new Date()
    ) {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    const isValid = await bcrypt.compare(token, existingUser.refreshTokenHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = existingUser.generateAccessToken();
    const newRefreshToken = existingUser.generateRefreshToken();
    await existingUser.setRefreshToken(newRefreshToken);
    await existingUser.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Refresh token expired or invalid" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const existingUser = await user
          .findById(decoded.id)
          .select("+refreshTokenHash");
        if (existingUser) {
          existingUser.refreshTokenHash = undefined;
          existingUser.refreshTokenExpires = undefined;
          await existingUser.save();
        }
      } catch (err) {
        // ignore invalid refresh token on logout
      }
    }
    clearAuthCookies(res);
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// auth for admin routes
export const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
// auth for donor routes
export const donorAuth = (req, res, next) => {
  if (req.user && req.user.role === "donor") {
    next();
  } else {
    res.status(403).json({ message: "Donor access required" });
  }
};

// get current user
export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
