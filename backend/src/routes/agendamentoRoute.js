import express from 'express';
import {
  createAgendamento,
  deleteAgendamento,
  getAgendamentoByUserId,
  getSummary,
  updateStatus
} from '../controllers/agendamentoController.js';

const router = express.Router();

// Rotas principais de agendamento
router.get('/:servico_tipo_id', getAgendamentoByUserId);  
router.post('/', createAgendamento);                      
router.delete('/:id', deleteAgendamento);                 
router.put('/:id/status', updateStatus);                  
router.get('/summary/geral', getSummary);                 

export default router;
