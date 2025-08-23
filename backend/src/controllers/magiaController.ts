import type { Request, Response } from "express"
import Magia from "../models/Magia"

export const getMagias = async (req: Request, res: Response) => {
  try {
    const { sistema, escola, nivel } = req.query
    const query: any = {}

    if (sistema) query.sistema = sistema
    if (escola) query.escola = escola
    if (nivel) query.nivel = nivel

    const magias = await Magia.find(query).sort({ nome: 1 })
    res.json(magias)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar magias" })
  }
}

export const getMagiaById = async (req: Request, res: Response) => {
  try {
    const magia = await Magia.findById(req.params.id)
    if (!magia) {
      return res.status(404).json({ message: "Magia não encontrada" })
    }
    res.json(magia)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar magia" })
  }
}

export const createMagia = async (req: Request, res: Response) => {
  try {
    const magia = new Magia(req.body)
    await magia.save()
    res.status(201).json(magia)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar magia" })
  }
}

export const updateMagia = async (req: Request, res: Response) => {
  try {
    const magia = await Magia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!magia) {
      return res.status(404).json({ message: "Magia não encontrada" })
    }
    res.json(magia)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar magia" })
  }
}

export const deleteMagia = async (req: Request, res: Response) => {
  try {
    const magia = await Magia.findByIdAndDelete(req.params.id)
    if (!magia) {
      return res.status(404).json({ message: "Magia não encontrada" })
    }
    res.json({ message: "Magia removida com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover magia" })
  }
}
