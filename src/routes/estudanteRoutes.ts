import express from 'express';
import { criarEstudante, atualizarEstudante, buscarEstudantePorId } from '../controllers/estudanteController';

const router = express.Router();

// Rota para criar um novo estudante
router.post('/estudante', criarEstudante);

// Rota para atualizar a turma de um estudante
router.put('/estudante', atualizarEstudante);

// Rota para realizar busca do estudante por ID
router.get('/estudante/:id', buscarEstudantePorId);

export default router;