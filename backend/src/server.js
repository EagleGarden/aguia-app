import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import agendamentoRoute from "./routes/agendamentoRoute.js";
import job from "./config/cron.js";

dotenv.config();
const app = express();
if (process.env.NODE_ENV === 'production') job.start()
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})
// Inicializar rotas
app.use("/api/agendamento", agendamentoRoute);

// Rota base para teste
app.get("/", (req, res) => {
  res.send("Servidor de Jardinagem rodando com sucesso!");
});

// Inicializar servidor e banco
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
});
