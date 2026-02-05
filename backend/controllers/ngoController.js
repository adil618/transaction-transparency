import NGO from "../models/Ngo.js";

/* ================= CREATE NGO ================= */
export const createNgo = async (req, res) => {
  try {
    const ngoExists = await NGO.findOne({ user: req.user._id });
    if (ngoExists) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const ngo = await NGO.create({
      user: req.user._id,
      ...req.body,
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

/* ================= GET MY NGO ================= */
export const getMyNgo = async (req, res) => {
  try {
    const ngo = await NGO.findOne({ user: req.user._id });
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    res.json(ngo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= APPROVE NGO (ADMIN) ================= */
export const approveNgo = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    ngo.status = "approved";
    ngo.approvedBy = req.user._id;
    ngo.approvedAt = Date.now();
    await ngo.save();

    res.json({
      success: true,
      message: "NGO approved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= REJECT NGO (ADMIN) ================= */
export const rejectNgo = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    ngo.status = "rejected";
    ngo.approvedBy = req.user._id;
    ngo.approvedAt = Date.now();
    await ngo.save();

    res.json({
      success: true,
      message: "NGO rejected",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
