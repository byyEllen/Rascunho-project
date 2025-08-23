import type { Request, Response } from "express"
import Criatura from "../models/Criatura"

export const getCriaturas = async (req: Request, res: Response) => {
  try {
    const { sistema, tipo, search } = req.query
    const query: any = {}

    if (sistema) query.sistema = sistema
    if (tipo) query.tipo = tipo
    if (search) {
      query.$or = [{ nome: { $regex: search, $options: "i" } }, { descricao: { $regex: search, $options: "i" } }]
    }

    const criaturas = await Criatura.find(query).sort({ nome: 1 })
    res.json(criaturas)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar criaturas" })
  }
}

export const getCriaturaById = async (req: Request, res: Response) => {
  try {
    const criatura = await Criatura.findById(req.params.id)
    if (!criatura) {
      return res.status(404).json({ message: "Criatura não encontrada" })
    }
    res.json(criatura)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar criatura" })
  }
}

export const createCriatura = async (req: Request, res: Response) => {
  try {
    const criatura = new Criatura(req.body)
    await criatura.save()
    res.status(201).json(criatura)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar criatura" })
  }
}

export const updateCriatura = async (req: Request, res: Response) => {
  try {
    const criatura = await Criatura.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!criatura) {
      return res.status(404).json({ message: "Criatura não encontrada" })
    }
    res.json(criatura)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar criatura" })
  }
}

export const deleteCriatura = async (req: Request, res: Response) => {
  try {
    const criatura = await Criatura.findByIdAndDelete(req.params.id)
    if (!criatura) {
      return res.status(404).json({ message: "Criatura não encontrada" })
    }
    res.json({ message: "Criatura removida com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover criatura" })
  }
}
