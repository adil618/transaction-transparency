import PaymentRequest from "../models/PaymentRequest.js";
import NGO from "../models/Ngo.js";

const getNgoForUser = async (userId) => {
  const ngo = await NGO.findOne({ user: userId });
  return ngo;
};

// Create a payment request (NGO)
export const createPaymentRequest = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }
    if (ngo.status !== "approved") {
      return res.status(403).json({ message: "NGO not approved" });
    }

    const { title, amount, category, purpose, campaignId, documents } = req.body;
    if (!title || !amount || !purpose) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paymentRequest = await PaymentRequest.create({
      ngo: ngo._id,
      title,
      amount,
      category: category || "other",
      purpose,
      campaign: campaignId || null,
      documents: documents || [],
    });

    res.status(201).json({ success: true, paymentRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get my payment requests (NGO)
export const getMyPaymentRequests = async (req, res) => {
  try {
    const ngo = await getNgoForUser(req.user._id);
    if (!ngo) {
      return res.status(400).json({ message: "NGO profile not found" });
    }

    const paymentRequests = await PaymentRequest.find({ ngo: ngo._id })
      .populate("campaign", "title")
      .populate("reviewedBy", "name")
      .sort({ createdAt: -1 });

    res.json(paymentRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all payment requests (Admin)
export const getAllPaymentRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, ngoId } = req.query;

    const query = {};
    if (status) query.status = status;
    if (ngoId) query.ngo = ngoId;

    const paymentRequests = await PaymentRequest.find(query)
      .populate("ngo", "name contactEmail")
      .populate("campaign", "title")
      .populate("reviewedBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PaymentRequest.countDocuments(query);

    res.json({
      success: true,
      paymentRequests,
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

// Approve payment request (Admin)
export const approvePaymentRequest = async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found" });
    }

    if (paymentRequest.status !== "pending") {
      return res.status(400).json({ message: "Payment request already processed" });
    }

    paymentRequest.status = "approved";
    paymentRequest.reviewedBy = req.user._id;
    paymentRequest.reviewedAt = new Date();
    await paymentRequest.save();

    res.json({
      success: true,
      message: "Payment request approved",
      paymentRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject payment request (Admin)
export const rejectPaymentRequest = async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found" });
    }

    if (paymentRequest.status !== "pending") {
      return res.status(400).json({ message: "Payment request already processed" });
    }

    paymentRequest.status = "rejected";
    paymentRequest.reviewedBy = req.user._id;
    paymentRequest.reviewedAt = new Date();
    paymentRequest.rejectionReason = req.body.reason || "No reason provided";
    await paymentRequest.save();

    res.json({
      success: true,
      message: "Payment request rejected",
      paymentRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Disburse payment request (Admin)
export const disbursePaymentRequest = async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id);
    if (!paymentRequest) {
      return res.status(404).json({ message: "Payment request not found" });
    }

    if (paymentRequest.status !== "approved") {
      return res.status(400).json({ message: "Payment request must be approved first" });
    }

    paymentRequest.status = "disbursed";
    paymentRequest.disbursedAt = new Date();
    paymentRequest.disbursementRef = `DISB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    await paymentRequest.save();

    res.json({
      success: true,
      message: "Payment disbursed",
      paymentRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
