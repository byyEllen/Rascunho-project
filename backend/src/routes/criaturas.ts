import express from "express"
import { authenticateToken } from "../middlewares/auth"
import {
  getCriaturas,
  getCriaturaById,
  createCriatura,
  updateCriatura,
  deleteCriatura,
} from "../controllers/criaturaController"

const router = express.Router()


router.get("/", getCriaturas)
router.get("/:id", getCriaturaById)


router.post("/", authenticateToken, createCriatura)
router.put("/:id", authenticateToken, updateCriatura)
router.delete("/:id", authenticateToken, deleteCriatura)

export default router
