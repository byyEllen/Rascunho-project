import express from "express"
import { authenticateToken } from "../middlewares/auth"
import { getItens, getItemById, createItem, updateItem, deleteItem } from "../controllers/itemController"

const router = express.Router()


router.get("/", getItens)
router.get("/:id", getItemById)


router.post("/", authenticateToken, createItem)
router.put("/:id", authenticateToken, updateItem)
router.delete("/:id", authenticateToken, deleteItem)

export default router
