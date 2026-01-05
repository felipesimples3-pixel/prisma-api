import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Chamada para OpenAI
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
Responda de forma clara, organizada e lógica.
Sempre responda corretamente.
Ajude o usuário a pensar melhor.
Seja objetiva, amigável e útil.
          `
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    // Envia de volta para o frontend
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Erro ao processar a mensagem. Tente novamente." });
  }
});

app.listen(3000, () => {
  console.log("🧠 PRISMA API rodando com IA real");
});
