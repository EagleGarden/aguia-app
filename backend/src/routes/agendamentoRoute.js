import express from 'express'
import { createAgendamento, deleteAgendamento, getAgendamentoByUserId, getSummary } from '../controllers/agendamentoController.js'

const router = express.Router()

router.get("/:servico_tipo_id", getAgendamentoByUserId);
router.post("/api/agendamento", createAgendamento);
router.delete("/:id", deleteAgendamento);
router.get("/summary", getSummary);


export default router