import mongoose, { type Document, Schema } from "mongoose"

export interface IRaca extends Document {
  nome: string
  sistema: string
  descricao: string
  habilidades: string[]
  atributos: {
    forca?: number
    destreza?: number
    constituicao?: number
    inteligencia?: number
    sabedoria?: number
    carisma?: number
  }
  idiomas: string[]
  tracos: string[]
  imagem?: string
  createdAt: Date
  updatedAt: Date
}

const RacaSchema: Schema = new Schema(
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
    descricao: {
      type: String,
      required: true,
    },
    habilidades: [
      {
        type: String,
        required: true,
      },
    ],
    atributos: {
      forca: { type: Number, default: 0 },
      destreza: { type: Number, default: 0 },
      constituicao: { type: Number, default: 0 },
      inteligencia: { type: Number, default: 0 },
      sabedoria: { type: Number, default: 0 },
      carisma: { type: Number, default: 0 },
    },
    idiomas: [String],
    tracos: [String],
    imagem: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IRaca>("Raca", RacaSchema)
