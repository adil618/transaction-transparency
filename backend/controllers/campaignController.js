import Campaign from "../models/Campaign.js";
import NGO from "../models/Ngo.js";

const getNgoForUser = async (userId) => {
  const ngo = await NGO.findOne({ user: userId });
  return ngo;
};

export const createCampaign = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }
    if (ngo.status !== "approved") {
      return res.status(403).json({ message: "NGO not approved" });
    }

    const { title, description, goalAmount, startDate, endDate, category } =
      req.body;
    if (!title || !description || !goalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const campaign = await Campaign.create({
      ngo: ngo._id,
      title,
      description,
      goalAmount,
      startDate,
      endDate,
      category,
    });

    res.status(201).json({ success: true, campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find()
    .populate("ngo", "name status")
    .sort({ createdAt: -1 });
  res.json(campaigns);
};

export const getMyCampaigns = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const campaigns = await Campaign.find({ ngo: ngo._id }).sort({
    createdAt: -1,
  });
  res.json(campaigns);
};

export const getCampaignById = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate(
    "ngo",
    "name status"
  );
  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }
  res.json(campaign);
};

export const updateCampaign = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    ngo: ngo._id,
  });
  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  const updates = ["title", "description", "goalAmount", "status", "endDate", "category"];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) {
      campaign[field] = req.body[field];
    }
  });
  await campaign.save();
  res.json({ success: true, campaign });
};

export const deleteCampaign = async (req, res) => {
  const ngo = await getNgoForUser(req.user._id);
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const campaign = await Campaign.findOneAndDelete({
    _id: req.params.id,
    ngo: ngo._id,
  });
  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }
  res.json({ success: true, message: "Campaign deleted" });
};
