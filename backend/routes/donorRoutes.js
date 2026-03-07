import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  getDonorStats,
  getAvailableCampaigns,
} from "../controllers/donorController.js";

const router = express.Router();

// All routes require authentication and donor role
router.use(protect);
router.use(authorizeRoles("donor"));

// Stats
router.get("/stats", getDonorStats);

// Campaigns available for donation
router.get("/campaigns", getAvailableCampaigns);

export default router;
