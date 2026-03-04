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

router.post("/", protect, authorizeRoles("donor"), createDonation);
router.get("/mine", protect, authorizeRoles("donor"), getMyDonations);
router.get("/ngo", protect, authorizeRoles("ngo"), getNgoTransactions);
router.get("/all", protect, authorizeRoles("admin"), getAllTransactions);

export default router;
