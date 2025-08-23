import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

const JWT_SECRET = process.env.JWT_SECRET || "seu-jwt-secret-super-seguro"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, sistemaPreferido } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe com este email" })
    }

    // Create new user
    const user = new User({
      nome,
      email,
      senha,
      sistemaPreferido: sistemaPreferido || "dnd",
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        sistemaPreferido: user.sistemaPreferido,
        avatar: user.avatar,
      },
    })
  } catch (error: any) {
    console.error("Erro no registro:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(senha)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        sistemaPreferido: user.sistemaPreferido,
        avatar: user.avatar,
      },
    })
  } catch (error: any) {
    console.error("Erro no login:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
}

// Get current user
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-senha")
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.json({ user })
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
}

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { nome, sistemaPreferido, avatar } = req.body
    const userId = req.user?.userId

    const user = await User.findByIdAndUpdate(
      userId,
      { nome, sistemaPreferido, avatar },
      { new: true, runValidators: true },
    ).select("-senha")

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.json({
      message: "Perfil atualizado com sucesso",
      user,
    })
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
}
