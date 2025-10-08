import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Inicialização do Banco de Dados
async function initDB() {
  try {
    // Tipos de serviço
    await sql`
      CREATE TABLE IF NOT EXISTS servico_tipo (
        id SERIAL PRIMARY KEY,
        chave VARCHAR(100) UNIQUE NOT NULL,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Agendamentos
    await sql`
      CREATE TABLE IF NOT EXISTS agendamento (
        id SERIAL PRIMARY KEY,
        servico_tipo_id INTEGER NOT NULL REFERENCES servico_tipo(id) ON DELETE RESTRICT,
        data_servico DATE NOT NULL,
        hora_servico TIME NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Agendado',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Histórico de status dos agendamentos
    await sql`
      CREATE TABLE IF NOT EXISTS agendamento_historico (
        id SERIAL PRIMARY KEY,
        agendamento_id INTEGER NOT NULL REFERENCES agendamento(id) ON DELETE CASCADE,
        status_anterior VARCHAR(50),
        status_novo VARCHAR(50) NOT NULL,
        nota TEXT,
        criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Banco de Dados inicializado com sucesso");
  } catch (error) {
    console.error("Erro ao inicializar o Banco de Dados:", error);
    process.exit(1);
  }
}

// Rotas da API

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor de Jardinagem rodando");
});

// Listar agendamentos por tipo de serviço
app.get("/api/agendamento/:servico_tipo_id", async (req, res) => {
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
});

// Criar um novo agendamento
app.post("/api/agendamento", async (req, res) => {
  try {
    const { servico_tipo_id, data_servico, hora_servico } = req.body;

    if (!servico_tipo_id || !data_servico || !hora_servico) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos." });
    }

    const agendamento = await sql`
      INSERT INTO agendamento (servico_tipo_id, data_servico, hora_servico)
      VALUES (${servico_tipo_id}, ${data_servico}, ${hora_servico})
      RETURNING *
    `;

    res.status(201).json(agendamento[0]);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

// Deletar um agendamento
app.delete("/api/agendamento/:id", async (req, res) => {
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
});

// Inicializar servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
});