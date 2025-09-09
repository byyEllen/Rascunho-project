import type { Request, Response } from "express";
import { IRaca } from "../models/Raca";
import { getRacaCollection } from "../database";
import { ObjectId } from "mongodb";

// -------------------- CONTROLLERS:D --------------------

export const getRacas = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sistema, search } = req.query;
    const collection = await getRacaCollection();

    const query: any = {};
    if (sistema) query.sistema = sistema;
    if (search) {
      query.$or = [
        { nome: { $regex: search, $options: "i" } },
        { descricao: { $regex: search, $options: "i" } },
      ];
    }

    const racas = await collection.find(query).sort({ nome: 1 }).toArray();
    res.json(racas);
  } catch (error: any) {
    console.error("Erro ao buscar raças:", error);
    res.status(500).json({ message: "Erro ao buscar raças" });
  }
};

export const getRacaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = await getRacaCollection();
    const raca = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!raca) {
      res.status(404).json({ message: "Raça não encontrada" });
      return;
    }

    res.json(raca);
  } catch (error: any) {
    console.error("Erro ao buscar raça:", error);
    res.status(500).json({ message: "Erro ao buscar raça" });
  }
};

export const createRaca = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = await getRacaCollection();
    const raca: IRaca = {
      ...req.body,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    const result = await collection.insertOne(raca);
    res.status(201).json({ ...raca, _id: result.insertedId });
  } catch (error: any) {
    console.error("Erro ao criar raça:", error);
    res.status(400).json({ message: "Erro ao criar raça" });
  }
};


export const updateRaca = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = await getRacaCollection();
    const id = new ObjectId(req.params.id);
    const updateDoc = { ...req.body, atualizadoEm: new Date() };

    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    const updatedRaca = result?.value;
    if (!updatedRaca) {
      res.status(404).json({ message: "Raça não encontrada" });
      return;
    }

    res.json(updatedRaca);
  } catch (error: any) {
    console.error("Erro ao atualizar raça:", error);
    res.status(400).json({ message: "Erro ao atualizar raça" });
  }
};

export const deleteRaca = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = await getRacaCollection();
    const id = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id: id });
    if (!result || result.deletedCount === 0) {
      res.status(404).json({ message: "Raça não encontrada" });
      return;
    }

    res.json({ message: "Raça removida com sucesso" });
  } catch (error: any) {
    console.error("Erro ao remover raça:", error);
    res.status(500).json({ message: "Erro ao remover raça" });
  }
};
