import NGO from "../models/Ngo.js";
import User from "../models/user.js";
import Campaign from "../models/Campaign.js";
import Donation from "../models/Donation.js";
import Beneficiary from "../models/Beneficiary.js";
import Payout from "../models/Payout.js";

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalNgos,
      totalCampaigns,
      totalDonations,
      totalBeneficiaries,
      recentDonations,
      monthlyStats
    ] = await Promise.all([
      User.countDocuments(),
      NGO.countDocuments(),
      Campaign.countDocuments(),
      Donation.countDocuments(),
      Beneficiary.countDocuments(),
      Donation.find()
        .populate('donor', 'name')
        .populate('campaign', 'title')
        .sort({ createdAt: -1 })
        .limit(5),
      // Monthly stats for the last 12 months
      Donation.aggregate([
        {
          $match: {
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
            totalAmount: { $sum: "$amount" },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ])
    ]);

    const totalRaised = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalNgos,
        totalCampaigns,
        totalDonations,
        totalBeneficiaries,
        totalRaised: totalRaised[0]?.total || 0,
        recentDonations,
        monthlyStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User management
export const listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;

    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password -refreshTokenHash')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
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

export const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true, runValidators: true }
    ).select('-password -refreshTokenHash');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listNgos = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'user.name': { $regex: search, $options: 'i' } },
        { 'user.email': { $regex: search, $options: 'i' } }
      ];
    }

    const ngos = await NGO.find(query)
      .populate('user', 'name email status')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await NGO.countDocuments(query);

    res.json({
      success: true,
      ngos,
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

export const approveNgo = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.json({ success: true, message: 'NGO approved successfully', ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectNgo = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    res.json({ success: true, message: 'NGO rejected successfully', ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'blocked' },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Campaign management
export const listCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const campaigns = await Campaign.find(query)
      .populate('ngo', 'name')
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

export const approveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, message: 'Campaign approved successfully', campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const archiveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.json({ success: true, message: 'Campaign archived successfully', campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Transaction/Donation management
export const listTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, dateFrom, dateTo, amountMin, amountMax } = req.query;

    const query = {};
    if (status) query.status = status;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }
    if (amountMin || amountMax) {
      query.amount = {};
      if (amountMin) query.amount.$gte = parseFloat(amountMin);
      if (amountMax) query.amount.$lte = parseFloat(amountMax);
    }

    const donations = await Donation.find(query)
      .populate('donor', 'name email')
      .populate('campaign', 'title')
      .populate('ngo', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(query);

    res.json({
      success: true,
      transactions: donations,
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

// Payout management
export const createPayout = async (req, res) => {
  try {
    const { amount, description, currency = 'USD' } = req.body;
    const ngoId = req.params.id;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }
    if (!description) {
      return res.status(400).json({ success: false, message: 'Description is required' });
    }

    // Find NGO and verify it exists and is approved
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({ success: false, message: 'NGO not found' });
    }
    if (ngo.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'NGO must be approved to receive payouts' });
    }

    // Verify NGO has bank details
    if (!ngo.bankDetails || !ngo.bankDetails.accountNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'NGO does not have bank details configured' 
      });
    }

    // Generate unique transaction reference
    const transactionRef = `PAYOUT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create payout record
    const payout = await Payout.create({
      admin: req.user._id,
      ngo: ngoId,
      amount,
      currency,
      description,
      status: 'completed',
      transactionRef,
      bankDetails: ngo.bankDetails
    });

    // Populate admin and ngo details
    await payout.populate('admin', 'name email');
    await payout.populate('ngo', 'name contactEmail');

    res.status(201).json({
      success: true,
      message: 'Payout created successfully',
      payout
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listPayouts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, ngoId, dateFrom, dateTo } = req.query;

    const query = {};
    if (status) query.status = status;
    if (ngoId) query.ngo = ngoId;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const payouts = await Payout.find(query)
      .populate('admin', 'name email')
      .populate('ngo', 'name contactEmail')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Payout.countDocuments(query);

    res.json({
      success: true,
      payouts,
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
