import FundUsage from "../models/FundUsage.js";
import NGO from "../models/Ngo.js";
import Donation from "../models/Donation.js";
import PaymentRequest from "../models/PaymentRequest.js";

const getNgoForUser = async (userId) => {
  const ngo = await NGO.findOne({ user: userId });
  return ngo;
};

// Create fund usage record (NGO)
export const createFundUsage = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }
    if (ngo.status !== "approved") {
      return res.status(403).json({ message: "NGO not approved" });
    }

    const { title, amount, category, description, beneficiaryId, paymentRequestId, receiptUrl, receiptImage } = req.body;
    if (!title || !amount || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const fundUsage = await FundUsage.create({
      ngo: ngo._id,
      title,
      amount,
      category: category || "other",
      description,
      beneficiary: beneficiaryId || null,
      paymentRequest: paymentRequestId || null,
      receiptUrl,
      receiptImage,
    });

    res.status(201).json({ success: true, fundUsage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get my fund usage records (NGO)
export const getMyFundUsage = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }

    const fundUsageRecords = await FundUsage.find({ ngo: ngo._id })
      .populate("beneficiary", "name")
      .populate("paymentRequest", "title")
      .sort({ createdAt: -1 });

    res.json(fundUsageRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all fund usage records (Admin)
export const getAllFundUsage = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, ngoId, category } = req.query;

    const query = {};
    if (status) query.status = status;
    if (ngoId) query.ngo = ngoId;
    if (category) query.category = category;

    const fundUsageRecords = await FundUsage.find(query)
      .populate("ngo", "name")
      .populate("beneficiary", "name")
      .populate("verifiedBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await FundUsage.countDocuments(query);

    res.json({
      success: true,
      fundUsageRecords,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify fund usage (Admin)
export const verifyFundUsage = async (req, res) => {
  try {
    const fundUsage = await FundUsage.findById(req.params.id);
    if (!fundUsage) {
      return res.status(404).json({ message: "Fund usage record not found" });
    }

    fundUsage.status = "verified";
    fundUsage.verifiedBy = req.user._id;
    fundUsage.verifiedAt = new Date();
    await fundUsage.save();

    res.json({
      success: true,
      message: "Fund usage verified",
      fundUsage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Flag fund usage (Admin)
export const flagFundUsage = async (req, res) => {
  try {
    const fundUsage = await FundUsage.findById(req.params.id);
    if (!fundUsage) {
      return res.status(404).json({ message: "Fund usage record not found" });
    }

    fundUsage.status = "flagged";
    fundUsage.verifiedBy = req.user._id;
    fundUsage.verifiedAt = new Date();
    fundUsage.metadata = {
      ...fundUsage.metadata,
      flagReason: req.body.reason || "Requires review"
    };
    await fundUsage.save();

    res.json({
      success: true,
      message: "Fund usage flagged for review",
      fundUsage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get NGO dashboard stats
export const getNgoDashboardStats = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }

    // Get total received from donations
    const donations = await Donation.find({ ngo: ngo._id });
    const totalReceived = donations.reduce((sum, d) => sum + d.amount, 0);

    // Get total spent from fund usage
    const fundUsageRecords = await FundUsage.find({ ngo: ngo._id });
    const totalSpent = fundUsageRecords.reduce((sum, f) => sum + f.amount, 0);

    // Available balance
    const availableBalance = totalReceived - totalSpent;

    // Count beneficiaries
    const Beneficiary = (await import("../models/Beneficiary.js")).default;
    const beneficiariesHelped = await Beneficiary.countDocuments({ ngo: ngo._id });

    // Active campaigns
    const Campaign = (await import("../models/Campaign.js")).default;
    const activeCampaigns = await Campaign.countDocuments({ ngo: ngo._id, status: "active" });

    // Pending payment requests
    const pendingRequests = await PaymentRequest.countDocuments({ ngo: ngo._id, status: "pending" });

    // Monthly revenue data
    const monthlyRevenue = await Donation.aggregate([
      {
        $match: {
          ngo: ngo._id,
          createdAt: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          amount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Monthly spending
    const monthlySpending = await FundUsage.aggregate([
      {
        $match: {
          ngo: ngo._id,
          createdAt: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          spent: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format monthly data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
      month: months[item._id.month - 1],
      year: item._id.year,
      amount: item.amount,
      spent: monthlySpending.find(s => s._id.month === item._id.month && s._id.year === item._id.year)?.spent || 0
    }));

    // Category breakdown
    const categoryBreakdown = await FundUsage.aggregate([
      { $match: { ngo: ngo._id } },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" }
        }
      }
    ]);

    // Get approved payment requests to determine budget per category
    const approvedRequests = await PaymentRequest.aggregate([
      { $match: { ngo: ngo._id, status: { $in: ["approved", "disbursed"] } } },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" }
        }
      }
    ]);

    const formattedCategoryBreakdown = categoryBreakdown.map(cat => ({
      category: cat._id?.charAt(0).toUpperCase() + cat._id?.slice(1) || "Other",
      spent: cat.spent,
      amount: approvedRequests.find(r => r._id === cat._id)?.amount || cat.spent
    }));

    res.json({
      success: true,
      stats: {
        totalReceived,
        totalSpent,
        availableBalance,
        beneficiariesHelped,
        activeCampaigns,
        pendingRequests,
        monthlyRevenue: formattedMonthlyRevenue,
        categoryBreakdown: formattedCategoryBreakdown
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
