import mongoose, { type Document, Schema } from "mongoose"

export interface ICriatura extends Document {
  nome: string
  tipo: string
  sistema: "dnd" | "tormenta20" | "vampiro"
  categoria: "monstros" | "racas" | "itens" | "magias"
  imagem: string
  descricao: string
  estatisticas: {
    forca?: number
    destreza?: number
    constituicao?: number
    inteligencia?: number
    sabedoria?: number
    carisma?: number
    ca?: number
    pv?: number
    deslocamento?: string
  }
  habilidades: string[]
  habitat?: string
  nivelDesafio?: string
  experiencia?: number
  criadoEm: Date
  atualizadoEm: Date
}

const CriaturaSchema = new Schema<ICriatura>(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      maxlength: [100, "Nome deve ter no máximo 100 caracteres"],
    },
    tipo: {
      type: String,
      required: [true, "Tipo é obrigatório"],
      trim: true,
    },
    sistema: {
      type: String,
      required: [true, "Sistema é obrigatório"],
      enum: ["dnd", "tormenta20", "vampiro"],
    },
    categoria: {
      type: String,
      required: [true, "Categoria é obrigatória"],
      enum: ["monstros", "racas", "itens", "magias"],
    },
    imagem: {
      type: String,
      required: [true, "Imagem é obrigatória"],
    },
    descricao: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      maxlength: [2000, "Descrição deve ter no máximo 2000 caracteres"],
    },
    estatisticas: {
      forca: { type: Number, min: 1, max: 30 },
      destreza: { type: Number, min: 1, max: 30 },
      constituicao: { type: Number, min: 1, max: 30 },
      inteligencia: { type: Number, min: 1, max: 30 },
      sabedoria: { type: Number, min: 1, max: 30 },
      carisma: { type: Number, min: 1, max: 30 },
      ca: { type: Number, min: 1 },
      pv: { type: Number, min: 1 },
      deslocamento: String,
    },
    habilidades: [
      {
        type: String,
        trim: true,
      },
    ],
    habitat: {
      type: String,
      trim: true,
    },
    nivelDesafio: {
      type: String,
      trim: true,
    },
    experiencia: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" },
  },
)

// Indexes for better performance
CriaturaSchema.index({ sistema: 1, categoria: 1 })
CriaturaSchema.index({ nome: "text", descricao: "text" })

export default mongoose.model<ICriatura>("Criatura", CriaturaSchema)
