import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
  nome: string
  email: string
  senha: string
  avatar?: string
  favoritos: mongoose.Types.ObjectId[]
  sistemaPreferido: "dnd" | "tormenta20" | "vampiro"
  criadoEm: Date
  atualizadoEm: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [2, "Nome deve ter pelo menos 2 caracteres"],
      maxlength: [50, "Nome deve ter no máximo 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    senha: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    },
    avatar: {
      type: String,
      default: null,
    },
    favoritos: [
      {
        type: Schema.Types.ObjectId,
        refPath: "favoritoModel",
      },
    ],
    sistemaPreferido: {
      type: String,
      enum: ["dnd", "tormenta20", "vampiro"],
      default: "dnd",
    },
  },
  {
    timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" },
  },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.senha = await bcrypt.hash(this.senha, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.senha)
}

export default mongoose.model<IUser>("User", UserSchema)
