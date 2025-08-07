import { z } from 'zod';

export const creatureSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  abilities: z.array(z.string()).optional(),
});
