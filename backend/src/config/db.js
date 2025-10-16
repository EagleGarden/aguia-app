import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

//Cria a conexão SQL usando o DB URI
export const sql = neon(process.env.DATABSE_URI)

export async function initDB() {
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
        valor NUMERIC(10,2) DEFAULT 0,
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