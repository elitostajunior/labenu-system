import express from 'express';
import { criarDocente, atualizarDocente } from '../controllers/docenteController';

const router = express.Router();

// Rota para criar um novo docente
router.post('/docente', criarDocente);

// Rota para atualizar a turma de um docente
router.put('/docente', atualizarDocente);

export default router;