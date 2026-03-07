import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";

// Get donor dashboard stats
export const getDonorStats = async (req, res) => {
  try {
    const donorId = req.user._id;

    // Get all donations by this donor
    const donations = await Donation.find({ donor: donorId })
      .populate("ngo", "name")
      .populate("campaign", "title category");

    // Calculate totals
    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalTransactions = donations.length;
    
    // Count unique NGOs supported
    const uniqueNgos = new Set(donations.map(d => d.ngo?._id?.toString()).filter(Boolean));
    const ngosSupported = uniqueNgos.size;

    // Estimate impact (placeholder - could be based on real data)
    const impactCount = Math.floor(totalDonated / 10); // Assume $10 helps 1 person

    // Get monthly donation data for the last 12 months
    const monthlyData = await Donation.aggregate([
      {
        $match: {
          donor: req.user._id,
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
          amount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format monthly data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedMonthlyData = monthlyData.map(item => ({
      month: months[item._id.month - 1],
      year: item._id.year,
      amount: item.amount,
      count: item.count
    }));

    // Get category breakdown
    const categoryData = await Donation.aggregate([
      {
        $match: { donor: req.user._id }
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "campaign",
          foreignField: "_id",
          as: "campaignData"
        }
      },
      {
        $unwind: { path: "$campaignData", preserveNullAndEmptyArrays: true }
      },
      {
        $group: {
          _id: { $ifNull: ["$campaignData.category", "General"] },
          amount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedCategoryData = categoryData.map(item => ({
      name: item._id || "General",
      value: item.amount,
      count: item.count
    }));

    // Get recent donations with more details
    const recentDonations = await Donation.find({ donor: donorId })
      .populate("ngo", "name logo")
      .populate("campaign", "title category")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      stats: {
        totalDonated,
        totalTransactions,
        ngosSupported,
        impactCount,
        monthlyData: formattedMonthlyData,
        categoryData: formattedCategoryData,
        recentDonations
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get campaigns available for donation
export const getAvailableCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = { status: "active" };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const campaigns = await Campaign.find(query)
      .populate("ngo", "name logo status transparencyScore")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Campaign.countDocuments(query);

    res.json({
      success: true,
      campaigns,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
