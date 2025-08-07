import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import creatureRoutes from './routes/creatureRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Exemplo de rota de teste
app.get('/', (_req, res) => {
  res.send('Bestiário rodando 🚀');
});

// Rotas de criaturas
app.use('/api/creatures', creatureRoutes);

export const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 Conectado ao MongoDB');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
  }
};
