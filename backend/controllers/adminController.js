import NGO from "../models/Ngo.js";
import User from "../models/user.js";

export const listNgos = async (req, res) => {
  const ngos = await NGO.find().populate("user", "name email role status");
  res.json(ngos);
};

export const blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.status = "blocked";
  await user.save();
  res.json({ success: true, message: "User blocked" });
};

export const unblockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.status = "active";
  await user.save();
  res.json({ success: true, message: "User unblocked" });
};
