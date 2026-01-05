import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
Você é a IA PRISMA.
Você entende português natural.
Você responde com clareza, organização e lógica.
Você NÃO responde errado.
Você ajuda o usuário a pensar melhor.
            `
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Erro ao processar a mensagem." });
  }
});

app.listen(3000, () => {
  console.log("🧠 PRISMA API rodando");
});
