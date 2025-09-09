import type { Request, Response } from "express";
import { ICriatura, criarCriatura } from "../models/Criatura";
import { getDatabase } from "../database";
import { ObjectId, FindOneAndUpdateOptions, WithId } from "mongodb";

const CRIATURAS_COLLECTION = "Criaturas";
const RACAS_COLLECTION = "Racas";

// -------------------- CONTROLLERS:D --------------------

// Listar todas as criaturas
export const getCriaturas = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sistema, tipo, search } = req.query;
    const db = await getDatabase();
    const collection = db.collection<ICriatura>(CRIATURAS_COLLECTION);

    const query: any = {};
    if (sistema) query.sistema = sistema;
    if (tipo) query.tipo = tipo;
    if (search) {
      query.$or = [
        { nome: { $regex: search, $options: "i" } },
        { descricao: { $regex: search, $options: "i" } },
      ];
    }

    const criaturas = await collection.find(query).sort({ nome: 1 }).toArray();
    res.json(criaturas);
  } catch (error: any) {
    console.error("Erro ao buscar criaturas:", error);
    res.status(500).json({ message: "Erro ao buscar criaturas" });
  }
};

// Buscar criatura por ID
export const getCriaturaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDatabase();
    const collection = db.collection<ICriatura>(CRIATURAS_COLLECTION);

    const criatura = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!criatura) {
      res.status(404).json({ message: "Criatura não encontrada" });
      return;
    }

    res.json(criatura);
  } catch (error: any) {
    console.error("Erro ao buscar criatura:", error);
    res.status(500).json({ message: "Erro ao buscar criatura" });
  }
};

// Criar criatura
export const createCriaturaController = async (req: Request, res: Response): Promise<void> => {
  try {
    const criatura: ICriatura = {
      ...req.body,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    const result = await criarCriatura(criatura);
    res.status(201).json({ ...criatura, _id: result.insertedId });
  } catch (error: any) {
    console.error("Erro ao criar criatura:", error);
    res.status(400).json({ message: "Erro ao criar criatura" });
  }
};

export const updateCriatura = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDatabase();
    const collection = db.collection<ICriatura>(CRIATURAS_COLLECTION);

    const id = new ObjectId(req.params.id);
    const updateDoc = { ...req.body, atualizadoEm: new Date() };

    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    if (!result || !("value" in result) || result.value === null) {
      res.status(404).json({ message: "Criatura não encontrada" });
      return;
    }

    res.json(result.value);
  } catch (error: any) {
    console.error("Erro ao atualizar criatura:", error);
    res.status(400).json({ message: "Erro ao atualizar criatura" });
  }
};

// Remover criatura
export const deleteCriatura = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDatabase();
    const collection = db.collection<ICriatura>(CRIATURAS_COLLECTION);

    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });

    if (!result || result.deletedCount === 0) {
      res.status(404).json({ message: "Criatura não encontrada" });
      return;
    }

    res.json({ message: "Criatura removida com sucesso" });
  } catch (error: any) {
    console.error("Erro ao remover criatura:", error);
    res.status(500).json({ message: "Erro ao remover criatura" });
  }
};
