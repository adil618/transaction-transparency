// MongoDB connection setup
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Please make sure MongoDB is running or update MONGO_URI in .env');
    // Don't exit the process, just log the error
    // process.exit(1);
  }
};

export default connectDB;
