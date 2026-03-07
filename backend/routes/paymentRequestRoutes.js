import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createPaymentRequest,
  getMyPaymentRequests,
  getAllPaymentRequests,
  approvePaymentRequest,
  rejectPaymentRequest,
  disbursePaymentRequest,
} from "../controllers/paymentRequestController.js";

const router = express.Router();

// NGO routes
router.post("/", protect, authorizeRoles("ngo"), createPaymentRequest);
router.get("/mine", protect, authorizeRoles("ngo"), getMyPaymentRequests);

// Admin routes
router.get("/all", protect, authorizeRoles("admin"), getAllPaymentRequests);
router.put("/:id/approve", protect, authorizeRoles("admin"), approvePaymentRequest);
router.put("/:id/reject", protect, authorizeRoles("admin"), rejectPaymentRequest);
router.put("/:id/disburse", protect, authorizeRoles("admin"), disbursePaymentRequest);

export default router;
