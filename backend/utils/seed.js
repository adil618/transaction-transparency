import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/user.js";
import NGO from "../models/Ngo.js";
import Campaign from "../models/Campaign.js";
import Beneficiary from "../models/Beneficiary.js";
import Donation from "../models/Donation.js";

dotenv.config();

const run = async () => {
  await connectDB();

  await Donation.deleteMany({});
  await Beneficiary.deleteMany({});
  await Campaign.deleteMany({});
  await NGO.deleteMany({});
  await User.deleteMany({});

  const admin = await User.create({
    name: "Admin User",
    email: "admin@demo.com",
    password: "password123",
    role: "admin",
  });

  const ngoUser = await User.create({
    name: "Helping Hands",
    email: "ngo@demo.com",
    password: "password123",
    role: "ngo",
  });

  const donor = await User.create({
    name: "Donor One",
    email: "donor@demo.com",
    password: "password123",
    role: "donor",
  });

  const ngo = await NGO.create({
    user: ngoUser._id,
    name: "Helping Hands Foundation",
    registrationNumber: "REG-12345",
    description: "Community support and relief.",
    contactEmail: "contact@helpinghands.org",
    contactPhone: "+1-555-0100",
    address: "123 Charity St, Austin, TX",
    bankDetails: {
      accountTitle: "Helping Hands Foundation",
      accountNumber: "1234567890",
      bankName: "Demo Bank",
      iban: "US00DEMO000123456789",
    },
    status: "approved",
    approvedBy: admin._id,
    approvedAt: new Date(),
  });

  const campaign = await Campaign.create({
    ngo: ngo._id,
    title: "Winter Relief Drive",
    description: "Provide warm clothing and meals.",
    goalAmount: 5000,
    currentAmount: 1200,
    status: "active",
  });

  await Beneficiary.create({
    ngo: ngo._id,
    name: "Community Shelter",
    contact: "+1-555-0200",
    needDescription: "Meals for 200 people",
  });

  await Donation.create({
    donor: donor._id,
    ngo: ngo._id,
    campaign: campaign._id,
    amount: 100,
    currency: "USD",
    status: "completed",
    transactionRef: "TXN-SEED-0001",
    paymentMethod: "card",
  });

  console.log("Seed data created");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
