import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";
import NGO from "../models/Ngo.js";

const generateRef = () =>
  `TXN-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

export const createDonation = async (req, res) => {
  try {
    const { campaignId, amount, currency } = req.body;
    if (!campaignId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    if (campaign.status !== "active") {
      return res.status(400).json({ message: "Campaign not active" });
    }

    const ngo = await NGO.findById(campaign.ngo);
    if (!ngo || ngo.status !== "approved") {
      return res.status(400).json({ message: "NGO not approved" });
    }

    const donation = await Donation.create({
      donor: req.user._id,
      ngo: ngo._id,
      campaign: campaign._id,
      amount,
      currency: currency || "USD",
      status: "completed",
      transactionRef: generateRef(),
    });

    campaign.currentAmount += Number(amount);
    if (campaign.currentAmount >= campaign.goalAmount) {
      campaign.status = "completed";
    }
    await campaign.save();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyDonations = async (req, res) => {
  const donations = await Donation.find({ donor: req.user._id })
    .populate("campaign", "title")
    .populate("ngo", "name")
    .sort({ createdAt: -1 });
  res.json(donations);
};

export const getNgoTransactions = async (req, res) => {
  const ngo = await NGO.findOne({ user: req.user._id });
  if (!ngo) {
    return res.status(400).json({ message: "NGO profile not found" });
  }
  const donations = await Donation.find({ ngo: ngo._id })
    .populate("campaign", "title")
    .populate("donor", "name email")
    .sort({ createdAt: -1 });
  res.json(donations);
};

export const getAllTransactions = async (req, res) => {
  const donations = await Donation.find()
    .populate("campaign", "title")
    .populate("ngo", "name")
    .populate("donor", "name email")
    .sort({ createdAt: -1 });
  res.json(donations);
};
