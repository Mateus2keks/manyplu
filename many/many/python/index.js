import { spawn } from "node:child_process";

export default async function (ctx) {
    const { msg } = ctx;

    if (!msg.body.startsWith("/ia")) return;

    const pergunta = msg.body.replace("/ia", "").trim();

    const python = spawn("python", ["plugins/python/ia.py"]);

    let resposta = "";

    python.stdin.write(JSON.stringify({
        pergunta: pergunta,
        chat: ctx.chat.id,
        user: msg.author
    }));

    python.stdin.end();

    python.stdout.on("data", (data) => {
        resposta += data.toString();
    });

    python.on("close", async () => {
        await msg.reply(resposta || "Sem resposta do Python");
    });
}