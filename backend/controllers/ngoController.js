import Ngo from "../models/Ngo.js";

// CREATE NGO
export const createNgo = async (req, res) => {
  try {
    const {
      name,
      registrationNumber,
      email,
      phone,
      address,
      documents,
    } = req.body;

    if (!name || !registrationNumber || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingNgo = await Ngo.findOne({ registrationNumber });
    if (existingNgo) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const ngo = await Ngo.create({
      name,
      registrationNumber,
      email,
      phone,
      address,
      documents,
      createdBy: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "NGO created successfully",
      ngo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL NGOs
export const getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find().populate("createdBy", "name email role");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
