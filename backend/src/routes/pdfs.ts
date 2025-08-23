import express from "express"
import fs from "fs"
import path from "path"
import { authenticateToken } from "../middlewares/auth"

const router = express.Router()

router.get("/", (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "../../uploads/pdfs")

    if (!fs.existsSync(uploadsPath)) {
      return res.json([])
    }

    const files = fs.readdirSync(uploadsPath)
    const pdfFiles = files
      .filter((file) => path.extname(file).toLowerCase() === ".pdf")
      .map((file) => ({
        filename: file,
        url: `/uploads/pdfs/${file}`,
        size: fs.statSync(path.join(uploadsPath, file)).size,
      }))

    return res.json(pdfFiles)
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar PDFs" })
  }
})

// Deletar PDF
router.delete("/:filename", authenticateToken, (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(__dirname, "../../uploads/pdfs", filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Arquivo não encontrado" })
    }

    fs.unlinkSync(filePath)
    return res.json({ message: "PDF removido com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: "Erro ao remover PDF" })
  }
})

export default router
