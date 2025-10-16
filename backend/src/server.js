import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";

import agendamentoRoute from "./routes/agendamentoRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Inicialização do Banco de Dados


app.use("/api/agendamento", agendamentoRoute);

// Inicializar servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
});
