import { Router, Request, Response } from 'express';
import Creature from '../models/Creature';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// Criar uma nova criatura (rota protegida)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const creature = new Creature(req.body);
    await creature.save();
    res.status(201).json(creature);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar criatura', error });
  }
});

// Listar todas as criaturas (rota pública)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar criaturas', error });
  }
});
import { creatureSchema } from '../validation/creatureValidation';

// No POST / (criar criatura)
router.post('/', authenticateToken, async (req, res) => {
  try {
    creatureSchema.parse(req.body);
    // resto do código...
  } catch (error) {
    return res.status(400).json({ message: 'Dados inválidos', error });
  }
});

export default router;
