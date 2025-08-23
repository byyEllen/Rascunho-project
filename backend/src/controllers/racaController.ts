import type { Request, Response } from "express"
import Raca from "../models/Raca"

export const getRacas = async (req: Request, res: Response) => {
  try {
    const { sistema } = req.query
    const query: any = {}

    if (sistema) query.sistema = sistema

    const racas = await Raca.find(query).sort({ nome: 1 })
    res.json(racas)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar raças" })
  }
}

export const getRacaById = async (req: Request, res: Response) => {
  try {
    const raca = await Raca.findById(req.params.id)
    if (!raca) {
      return res.status(404).json({ message: "Raça não encontrada" })
    }
    res.json(raca)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar raça" })
  }
}

export const createRaca = async (req: Request, res: Response) => {
  try {
    const raca = new Raca(req.body)
    await raca.save()
    res.status(201).json(raca)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar raça" })
  }
}

export const updateRaca = async (req: Request, res: Response) => {
  try {
    const raca = await Raca.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!raca) {
      return res.status(404).json({ message: "Raça não encontrada" })
    }
    res.json(raca)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar raça" })
  }
}

export const deleteRaca = async (req: Request, res: Response) => {
  try {
    const raca = await Raca.findByIdAndDelete(req.params.id)
    if (!raca) {
      return res.status(404).json({ message: "Raça não encontrada" })
    }
    res.json({ message: "Raça removida com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover raça" })
  }
}
