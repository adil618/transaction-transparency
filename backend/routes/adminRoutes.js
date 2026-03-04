import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  getDashboardStats,
  listUsers,
  updateUser,
  deleteUser,
  listNgos,
  approveNgo,
  rejectNgo,
  blockUser,
  unblockUser,
  listCampaigns,
  approveCampaign,
  archiveCampaign,
  listTransactions
} from "../controllers/adminController.js";

const router = express.Router();

// All admin routes require authentication and ADMIN role
router.use(protect);
router.use(authorizeRoles("admin"));

// Dashboard
router.get("/dashboard/stats", getDashboardStats);

// User management
router.get("/users", listUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);

// NGO management
router.get("/ngos", listNgos);
router.put("/ngos/:id/approve", approveNgo);
router.put("/ngos/:id/reject", rejectNgo);

// Campaign management
router.get("/campaigns", listCampaigns);
router.put("/campaigns/:id/approve", approveCampaign);
router.put("/campaigns/:id/archive", archiveCampaign);

// Transaction management
router.get("/transactions", listTransactions);

export default router;
