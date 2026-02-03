// Entry point for the backend server
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.use(express.json());
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
// api start 
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);

app.use("/api/ngos", ngoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
