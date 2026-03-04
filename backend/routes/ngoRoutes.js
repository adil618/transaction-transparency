import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { createNgo, getMyNgo, approveNgo, rejectNgo } from "../controllers/ngoController.js";

const router = express.Router();

// NGO creates profile
router.post("/", protect, authorizeRoles("ngo"), createNgo);

// NGO views own profile
router.get("/me", protect, authorizeRoles("ngo"), getMyNgo);

// ADMIN approves NGO
router.put("/approve/:id", protect, authorizeRoles("admin"), approveNgo);
// ADMIN rejects NGO
router.put("/reject/:id", protect, authorizeRoles("admin"), rejectNgo);

export default router;
