import mongoose, { type Document, Schema } from "mongoose"

export interface IMagia extends Document {
  nome: string
  sistema: string
  escola: string
  nivel: number
  tempoConjuracao: string
  alcance: string
  componentes: string[]
  duracao: string
  descricao: string
  nivelSuperior?: string
  imagem?: string
  createdAt: Date
  updatedAt: Date
}

const MagiaSchema: Schema = new Schema(
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
    escola: {
      type: String,
      required: true,
    },
    nivel: {
      type: Number,
      required: true,
      min: 0,
      max: 9,
    },
    tempoConjuracao: {
      type: String,
      required: true,
    },
    alcance: {
      type: String,
      required: true,
    },
    componentes: [String],
    duracao: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    nivelSuperior: String,
    imagem: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IMagia>("Magia", MagiaSchema)
