import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    currency: {
      type: String,
      default: "USD",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    transactionRef: {
      type: String,
      unique: true,
    },
    bankDetails: {
      accountTitle: String,
      accountNumber: String,
      bankName: String,
      iban: String,
    },
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payout ||
  mongoose.model("Payout", payoutSchema);
