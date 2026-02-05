import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createBeneficiary,
  getMyBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
} from "../controllers/beneficiaryController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("NGO"), createBeneficiary);
router.get("/mine", protect, authorizeRoles("NGO"), getMyBeneficiaries);
router.put("/:id", protect, authorizeRoles("NGO"), updateBeneficiary);
router.delete("/:id", protect, authorizeRoles("NGO"), deleteBeneficiary);

export default router;
