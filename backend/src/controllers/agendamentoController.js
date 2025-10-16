import { sql } from "../config/db.js";

export async function getAgendamentoByUserId(req, res) {
  try {
    const { servico_tipo_id } = req.params;

    const agendamentos = await sql`
          SELECT a.*, s.nome AS servico_nome
          FROM agendamento a
          JOIN servico_tipo s ON a.servico_tipo_id = s.id
          WHERE a.servico_tipo_id = ${servico_tipo_id}
          ORDER BY a.data_servico, a.hora_servico
        `;

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

export async function createAgendamento(req, res) {
  try {
    const { servico_tipo_id, data_servico, hora_servico, valor } = req.body;

    if (!servico_tipo_id || !data_servico || !hora_servico) {
      return res.status(400).json({
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const agendamento = await sql`
      INSERT INTO agendamento (servico_tipo_id, data_servico, hora_servico, valor)
      VALUES (${servico_tipo_id}, ${data_servico}, ${hora_servico}, ${
      valor || 0
    })
      RETURNING *
    `;

    res.status(201).json(agendamento[0]);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

export async function deleteAgendamento(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const resultado = await sql`
      DELETE FROM agendamento WHERE id = ${id} RETURNING *
    `;

    if (resultado.length === 0) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    res.status(200).json({ message: "Agendamento deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

export async function getSummary(req, res) {
  try {
    const totalConcluidos = await sql`
      SELECT COUNT(*) AS total_concluidos, COALESCE(SUM(valor), 0) AS total_valor
      FROM agendamento WHERE status = 'Concluído'
    `;

    const totalAgendados = await sql`
      SELECT COUNT(*) AS total_agendados
      FROM agendamento WHERE status = 'Agendado'
    `;

    const totalAndamento = await sql`
      SELECT COUNT(*) AS total_andamento
      FROM agendamento WHERE status = 'Em andamento'
    `;

    res.status(200).json({
      concluidos: totalConcluidos[0].total_concluidos,
      valor_total: totalConcluidos[0].total_valor,
      agendados: totalAgendados[0].total_agendados,
      andamento: totalAndamento[0].total_andamento,
    });
  } catch (error) {
    console.error("Erro ao obter resumo de agendamentos:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
