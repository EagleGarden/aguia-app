import express from 'express';
import {
  createAgendamento,
  deleteAgendamento,
  getAgendamentoByUserId,
  getSummary,
  updateStatus,
  getAllAgendamentos // <--- 1. Importei a nova função aqui
} from '../controllers/agendamentoController.js';

const router = express.Router();

// --- IMPORTANTE: A ORDEM DAS ROTAS IMPORTA ---

// 1. Rotas específicas (devem vir antes das rotas com :id)
router.get('/summary/geral', getSummary); 

// 2. Rota Raiz (Listar TODOS os agendamentos para a Home)
router.get('/', getAllAgendamentos); // <--- 2. Adicionei esta linha

// 3. Criar agendamento
router.post('/', createAgendamento); 

// 4. Rotas com parâmetros (devem vir por último)
router.get('/:servico_tipo_id', getAgendamentoByUserId); 
router.delete('/:id', deleteAgendamento); 
router.put('/:id/status', updateStatus); 

export default router;