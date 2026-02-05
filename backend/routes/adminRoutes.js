import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { listNgos, blockUser, unblockUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/ngos", protect, authorizeRoles("ADMIN"), listNgos);
router.put("/users/:id/block", protect, authorizeRoles("ADMIN"), blockUser);
router.put("/users/:id/unblock", protect, authorizeRoles("ADMIN"), unblockUser);

export default router;
