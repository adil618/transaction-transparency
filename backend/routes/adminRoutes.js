import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  getDashboardStats,
  getAdminStats,
  getPendingNgos,
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
  listTransactions,
  createPayout,
  listPayouts
} from "../controllers/adminController.js";
import {
  getAllPaymentRequests,
  approvePaymentRequest,
  rejectPaymentRequest,
  disbursePaymentRequest
} from "../controllers/paymentRequestController.js";
import {
  getAllFundUsage,
  verifyFundUsage,
  flagFundUsage
} from "../controllers/fundUsageController.js";

const router = express.Router();

// All admin routes require authentication and ADMIN role
router.use(protect);
router.use(authorizeRoles("admin"));

// Dashboard
router.get("/stats", getAdminStats);
router.get("/dashboard/stats", getDashboardStats);

// User management
router.get("/users", listUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);

// NGO management
router.get("/ngos", listNgos);
router.get("/ngos/pending", getPendingNgos);
router.put("/ngos/:id/approve", approveNgo);
router.put("/ngos/:id/reject", rejectNgo);
router.post("/ngos/:id/payout", createPayout);

// Campaign management
router.get("/campaigns", listCampaigns);
router.put("/campaigns/:id/approve", approveCampaign);
router.put("/campaigns/:id/archive", archiveCampaign);

// Transaction management
router.get("/transactions", listTransactions);

// Payment request management
router.get("/payment-requests", getAllPaymentRequests);
router.put("/payment-requests/:id/approve", approvePaymentRequest);
router.put("/payment-requests/:id/reject", rejectPaymentRequest);
router.put("/payment-requests/:id/disburse", disbursePaymentRequest);

// Fund usage management
router.get("/fund-usage", getAllFundUsage);
router.put("/fund-usage/:id/verify", verifyFundUsage);
router.put("/fund-usage/:id/flag", flagFundUsage);

// Payout management
router.get("/payouts", listPayouts);

export default router;
