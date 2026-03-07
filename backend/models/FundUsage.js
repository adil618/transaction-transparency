import mongoose from "mongoose";

const fundUsageSchema = new mongoose.Schema(
  {
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    category: {
      type: String,
      enum: ["education", "healthcare", "infrastructure", "salaries", "supplies", "transportation", "other"],
      default: "other",
    },
    description: {
      type: String,
      required: true,
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
    },
    paymentRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentRequest",
    },
    receiptUrl: String,
    receiptImage: String,
    status: {
      type: String,
      enum: ["recorded", "verified", "flagged"],
      default: "recorded",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: Date,
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.models.FundUsage ||
  mongoose.model("FundUsage", fundUsageSchema);
