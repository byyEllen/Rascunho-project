import { Router, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Registro
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email já registrado.' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro', error });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou senha inválidos.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Email ou senha inválidos.' });

    // Gera token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});

import { registerSchema, loginSchema } from '../validation/authValidation';

// No POST /register
router.post('/register', async (req, res) => {
  try {
    registerSchema.parse(req.body);
    // resto do código...
  } catch (error) {
    return res.status(400).json({ message: 'Dados inválidos', error });
  }
});

export default router;
