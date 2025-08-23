import type { Request, Response } from "express"
import Item from "../models/Item"

export const getItens = async (req: Request, res: Response) => {
  try {
    const { sistema, tipo } = req.query
    const query: any = {}

    if (sistema) query.sistema = sistema
    if (tipo) query.tipo = tipo

    const itens = await Item.find(query).sort({ nome: 1 })
    res.json(itens)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens" })
  }
}

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar item" })
  }
}

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = new Item(req.body)
    await item.save()
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar item" })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" })
    }
    res.json(item)
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar item" })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" })
    }
    res.json({ message: "Item removido com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover item" })
  }
}
