import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "NGO", "DONOR"],
      default: "DONOR",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    lastLogin: {
      type: Date,
    },

    refreshTokenHash: {
      type: String,
      select: false,
    },

    refreshTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);


// PASSWORD HASHING
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// PASSWORD COMPARE METHOD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" }
  );
};

userSchema.methods.setRefreshToken = async function (refreshToken) {
  const salt = await bcrypt.genSalt(10);
  this.refreshTokenHash = await bcrypt.hash(refreshToken, salt);
  const expiresMs = 7 * 24 * 60 * 60 * 1000;
  this.refreshTokenExpires = new Date(Date.now() + expiresMs);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
