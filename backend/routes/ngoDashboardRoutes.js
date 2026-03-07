import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { getNgoDashboardStats } from "../controllers/fundUsageController.js";

const router = express.Router();

// Require NGO authentication
router.use(protect);
router.use(authorizeRoles("ngo"));

// Dashboard stats
router.get("/dashboard/stats", getNgoDashboardStats);

export default router;
