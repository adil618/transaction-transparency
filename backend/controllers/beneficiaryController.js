import Beneficiary from "../models/Beneficiary.js";
import NGO from "../models/Ngo.js";

const getNgoForUser = async (userId) => {
  const ngo = await NGO.findOne({ user: userId });
  return ngo;
};

export const createBeneficiary = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }
    if (ngo.status !== "approved") {
      return res.status(403).json({ message: "NGO not approved" });
    }

    const { name, contact, needDescription } = req.body;
    if (!name || !needDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const beneficiary = await Beneficiary.create({
      ngo: ngo._id,
      name,
      contact,
      needDescription,
    });

    res.status(201).json({ success: true, beneficiary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBeneficiaries = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const beneficiaries = await Beneficiary.find({ ngo: ngo._id }).sort({
    createdAt: -1,
  });
  res.json(beneficiaries);
};

export const updateBeneficiary = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const beneficiary = await Beneficiary.findOne({
    _id: req.params.id,
    ngo: ngo._id,
  });
  if (!beneficiary) {
    return res.status(404).json({ message: "Beneficiary not found" });
  }
  const updates = ["name", "contact", "needDescription", "status"];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) {
      beneficiary[field] = req.body[field];
    }
  });
  await beneficiary.save();
  res.json({ success: true, beneficiary });
};

export const deleteBeneficiary = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const beneficiary = await Beneficiary.findOneAndDelete({
    _id: req.params.id,
    ngo: ngo._id,
  });
  if (!beneficiary) {
    return res.status(404).json({ message: "Beneficiary not found" });
  }
  res.json({ success: true, message: "Beneficiary deleted" });
};
