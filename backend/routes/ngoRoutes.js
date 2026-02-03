import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { createNgo, getMyNgo, approveNgo } from "../controllers/ngoController.js";

const router = express.Router();

// NGO creates profile
router.post("/", protect, authorizeRoles("NGO"), createNgo);

// NGO views own profile
router.get("/me", protect, authorizeRoles("NGO"), getMyNgo);

// ADMIN approves NGO
router.put("/approve/:id", protect, authorizeRoles("ADMIN"), approveNgo);

export default router;
