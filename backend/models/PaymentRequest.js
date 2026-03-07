import mongoose from "mongoose";

const paymentRequestSchema = new mongoose.Schema(
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
      enum: ["education", "healthcare", "infrastructure", "operational", "emergency", "other"],
      default: "other",
    },
    purpose: {
      type: String,
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "disbursed"],
      default: "pending",
    },
    documents: [{
      name: String,
      url: String,
      type: String,
    }],
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: Date,
    rejectionReason: String,
    disbursedAt: Date,
    disbursementRef: String,
  },
  { timestamps: true }
);

export default mongoose.models.PaymentRequest ||
  mongoose.model("PaymentRequest", paymentRequestSchema);
