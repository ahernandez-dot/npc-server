const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/npc-chat", async (req, res) => {
  try {
    const { npcName, personality, message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are ${npcName}, a ${personality} contestant in a Roblox reality show. 
Keep responses appropriate, short, dramatic, and in character. 
Do not swear. Do not talk about unsafe topics.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 60
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.json({
      reply: "I can't answer right now."
    });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
