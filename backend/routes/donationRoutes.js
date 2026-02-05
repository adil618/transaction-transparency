import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createDonation,
  getMyDonations,
  getNgoTransactions,
  getAllTransactions,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("DONOR"), createDonation);
router.get("/mine", protect, authorizeRoles("DONOR"), getMyDonations);
router.get("/ngo", protect, authorizeRoles("NGO"), getNgoTransactions);
router.get("/all", protect, authorizeRoles("ADMIN"), getAllTransactions);

export default router;
