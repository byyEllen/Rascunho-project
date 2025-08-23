import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"

// Import routes
import authRoutes from "./routes/authRoutes"
import criaturaRoutes from "./routes/criaturas"
import racaRoutes from "./routes/racas"
import itemRoutes from "./routes/itens"
import magiaRoutes from "./routes/magias"
import pdfRoutes from "./routes/pdfs"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: "Muitas tentativas, tente novamente em 15 minutos",
})

// Middleware
app.use(helmet())
app.use(limiter)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Static files for PDFs
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/criaturas", criaturaRoutes)
app.use("/api/racas", racaRoutes)
app.use("/api/itens", itemRoutes)
app.use("/api/magias", magiaRoutes)
app.use("/api/pdfs", pdfRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Algo deu errado!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Rota não encontrada" })
})

// MongoDB connection
const connectDB = async () => {
  try {
    // Use MongoDB Atlas se a variável de ambiente estiver definida
    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://ellenruth526:<db_password>@cluster0.lrjbgdr.mongodb.net/"

    await mongoose.connect(mongoURI)
    console.log("✅ MongoDB conectado com sucesso")
  } catch (error) {
    console.error("❌ Erro ao conectar com MongoDB:", error)
    process.exit(1)
  }
}

// Start server
const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
    console.log(`📚 API disponível em http://localhost:${PORT}/api`)
  })
}

startServer()

export default app
