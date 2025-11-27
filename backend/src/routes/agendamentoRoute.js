import express from 'express';
import {
  createAgendamento,
  deleteAgendamento,
  getAgendamentoByUserId,
  getSummary,
  updateStatus,
  getAllAgendamentos // Agora essa importação vai funcionar!
} from '../controllers/agendamentoController.js';

const router = express.Router();

// 1. Rota de Resumo (Deve vir antes das rotas com ID)
router.get('/summary/geral', getSummary);

// 2. Rota Raiz (Home - Listar Todos)
router.get('/', getAllAgendamentos);

// 3. Criar Agendamento
router.post('/', createAgendamento);

// 4. Rotas com ID (Devem vir por último)
router.get('/:servico_tipo_id', getAgendamentoByUserId);
router.delete('/:id', deleteAgendamento);
router.put('/:id/status', updateStatus);

export default router;