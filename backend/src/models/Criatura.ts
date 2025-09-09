import { getDatabase } from "../database";
export interface ICriatura {
  nome: string;
  tipo: string;
  sistema: "dnd" | "tormenta20" | "vampiro";
  categoria: "monstros" | "racas"; 
  imagem: string;
  descricao: string;
  estatisticas: {
    forca?: number;
    destreza?: number;
    constituicao?: number;
    inteligencia?: number;
    sabedoria?: number;
    carisma?: number;
    ca?: number;
    pv?: number;
    deslocamento?: string;
  };
  habilidades: string[];
  habitat?: string;
  nivelDesafio?: string;
  experiencia?: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

export async function criarCriatura(criatura: ICriatura) {
  const db = await getDatabase();
  const collection = db.collection<ICriatura>("Criaturas");
  const result = await collection.insertOne(criatura);
  return result;
}

export async function listarCriaturas() {
  const db = await getDatabase();
  const collection = db.collection<ICriatura>("Criaturas");
  return await collection.find({}).toArray();
}
