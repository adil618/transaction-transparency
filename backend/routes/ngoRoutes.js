import express from "express";
import { createNgo, getAllNgos } from "../controllers/ngoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNgo); // create NGO
router.get("/", getAllNgos);           // list NGOs

export default router;
