import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema(
  {
    // NGO owner (must be a user with role NGO)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    contactEmail: {
      type: String,
      required: true,
    },

    contactPhone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // Bank / Wallet info (TRANSPARENCY)
    bankDetails: {
      accountTitle: String,
      accountNumber: String,
      bankName: String,
      iban: String,
    },

    // Verification documents
    documents: [
      {
        name: String,
        url: String,
      },
    ],

    // Admin verification
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ADMIN
    },

    approvedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("NGO", ngoSchema);
