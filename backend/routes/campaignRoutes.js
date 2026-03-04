import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createCampaign,
  getCampaigns,
  getMyCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

router.get("/", getCampaigns);
router.get("/mine", protect, authorizeRoles("ngo"), getMyCampaigns);
router.get("/:id", getCampaignById);
router.post("/", protect, authorizeRoles("ngo"), createCampaign);
router.put("/:id", protect, authorizeRoles("ngo"), updateCampaign);
router.delete("/:id", protect, authorizeRoles("ngo"), deleteCampaign);

export default router;
