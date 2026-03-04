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

router.post("/", protect, authorizeRoles("ngo"), createBeneficiary);
router.get("/mine", protect, authorizeRoles("ngo"), getMyBeneficiaries);
router.put("/:id", protect, authorizeRoles("ngo"), updateBeneficiary);
router.delete("/:id", protect, authorizeRoles("ngo"), deleteBeneficiary);

export default router;
