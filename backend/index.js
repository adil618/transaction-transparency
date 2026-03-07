// Entry point for the backend server
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import formRoutes from './routes/formRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import paymentRequestRoutes from './routes/paymentRequestRoutes.js';
import fundUsageRoutes from './routes/fundUsageRoutes.js';
import ngoDashboardRoutes from './routes/ngoDashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.CLIENT_URL
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Transaction Transparency API', version: '1.0.0' });
});

app.use("/api/auth", authRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/payment-requests", paymentRequestRoutes);
app.use("/api/fund-usage", fundUsageRoutes);
app.use("/api/ngo", ngoDashboardRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
