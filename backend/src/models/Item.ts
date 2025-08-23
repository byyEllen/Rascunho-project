import mongoose, { type Document, Schema } from "mongoose"

export interface IItem extends Document {
  nome: string
  sistema: string
  tipo: string
  descricao: string
  raridade: string
  preco?: string
  peso?: string
  propriedades: string[]
  imagem?: string
  createdAt: Date
  updatedAt: Date
}

const ItemSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    sistema: {
      type: String,
      required: true,
      enum: ["dnd", "tormenta20", "vampiro"],
    },
    tipo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    raridade: {
      type: String,
      required: true,
      enum: ["comum", "incomum", "raro", "muito-raro", "lendario", "artefato"],
    },
    preco: String,
    peso: String,
    propriedades: [String],
    imagem: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IItem>("Item", ItemSchema)
