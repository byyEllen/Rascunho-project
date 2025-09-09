import type { Request, Response } from "express"
import jwt, { Secret, SignOptions } from "jsonwebtoken"
import User, { IUser } from "../models/User"

interface JwtPayload {
  userId: string
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload
  }
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "seu-jwt-secret-super-seguro"
// força o tipo para o que o SignOptions espera
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// -------------------- Controllers --------------------

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, sistemaPreferido } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: "Usuário já existe com este email" })
      return
    }

    const user: IUser = new User({
      nome,
      email,
      senha,
      sistemaPreferido: sistemaPreferido || "dnd",
    })

    await user.save()

    const token = generateToken(user._id.toString())

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user._id.toString(),
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
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body

    const user = (await User.findOne({ email })) as IUser | null
    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" })
      return
    }

    const isPasswordValid = await user.comparePassword(senha)
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas" })
      return
    }

    const token = generateToken(user._id.toString())

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id.toString(),
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
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Não autorizado" })
      return
    }

    const user = await User.findById(req.user.userId).select("-senha")
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" })
      return
    }

    res.json({ user })
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error)
    res.status(500).json({ message: "Erro interno do servidor", error: error.message })
  }
}

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Não autorizado" })
      return
    }

    const { nome, sistemaPreferido, avatar } = req.body
    const userId = req.user.userId

    const user = await User.findByIdAndUpdate(
      userId,
      { nome, sistemaPreferido, avatar },
      { new: true, runValidators: true },
    ).select("-senha")

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" })
      return
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
