import express from 'express';
import { criarTurma } from '../controllers/turmaController';

const router = express.Router();

// Rota para criar uma nova turma
router.post('/turma', criarTurma);

export default router;