import mongoose, { Document, Schema } from 'mongoose';

export interface ICreature extends Document {
  name: string;
  type: string;
  description: string;
  abilities: string[];
}

const CreatureSchema = new Schema<ICreature>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  abilities: { type: [String], default: [] },
});

export default mongoose.model<ICreature>('Creature', CreatureSchema);
