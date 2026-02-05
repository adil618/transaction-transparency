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
router.get("/mine", protect, authorizeRoles("NGO"), getMyCampaigns);
router.get("/:id", getCampaignById);
router.post("/", protect, authorizeRoles("NGO"), createCampaign);
router.put("/:id", protect, authorizeRoles("NGO"), updateCampaign);
router.delete("/:id", protect, authorizeRoles("NGO"), deleteCampaign);

export default router;
