import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createFundUsage,
  getMyFundUsage,
  getAllFundUsage,
  verifyFundUsage,
  flagFundUsage,
  getNgoDashboardStats,
} from "../controllers/fundUsageController.js";

const router = express.Router();

// NGO routes
router.post("/", protect, authorizeRoles("ngo"), createFundUsage);
router.get("/mine", protect, authorizeRoles("ngo"), getMyFundUsage);

// Admin routes
router.get("/all", protect, authorizeRoles("admin"), getAllFundUsage);
router.put("/:id/verify", protect, authorizeRoles("admin"), verifyFundUsage);
router.put("/:id/flag", protect, authorizeRoles("admin"), flagFundUsage);

export default router;
