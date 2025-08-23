import express from "express"
import { authenticateToken } from "../middlewares/auth"
import { getRacas, getRacaById, createRaca, updateRaca, deleteRaca } from "../controllers/racaController"

const router = express.Router()


router.get("/", getRacas)
router.get("/:id", getRacaById)


router.post("/", authenticateToken, createRaca)
router.put("/:id", authenticateToken, updateRaca)
router.delete("/:id", authenticateToken, deleteRaca)

export default router
