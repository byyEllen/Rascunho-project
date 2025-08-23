import express from "express"
import { authenticateToken } from "../middlewares/auth"
import { getMagias, getMagiaById, createMagia, updateMagia, deleteMagia } from "../controllers/magiaController"

const router = express.Router()

// Public routes
router.get("/", getMagias)
router.get("/:id", getMagiaById)

// Protected routes
router.post("/", authenticateToken, createMagia)
router.put("/:id", authenticateToken, updateMagia)
router.delete("/:id", authenticateToken, deleteMagia)

export default router
