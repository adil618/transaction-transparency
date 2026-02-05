// Entry point for the backend server
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
// api start 
app.use("/api/auth", authRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
