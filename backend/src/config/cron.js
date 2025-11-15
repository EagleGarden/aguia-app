import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("Requisição GET enviada com sucesso");
      else console.log("Falha na requisição GET", res.statusCode);
    })
    .on("error", (e) => console.error("Erro ao enviar requisição", e));
});

export default job;


// EXPLICAÇÃO DO CRON JOB:
// Cron jobs (ou tarefas Cron) são tarefas agendadas que rodam periodicamente em intervalos fixos
// nós queremos enviar 1 requisição GET a cada 14 minutos

// Como definir um "Agendamento"?
// Você define um agendamento usando uma expressão cron, que consiste em 5 campos representando:

//! MINUTO, HORA, DIA DO MÊS, MÊS, DIA DA SEMANA

//? EXEMPLOS E EXPLICAÇÃO:
//* 14 * * * * - A cada 14 minutos
//* 0 0 * * 0 - À meia-noite de todo domingo
//* 30 3 15 * * - Às 3:30 AM, no dia 15 de todo mês
//* 0 0 1 1 * - À meia-noite, no dia 1º de janeiro
//* 0 * * * * - A cada hora