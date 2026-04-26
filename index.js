const express = require("express");
const app = express();

app.use(express.json());

app.post("/npc-chat", (req, res) => {
  const { message } = req.body;

  let reply = "I’m not sure what to say.";

  if (message.toLowerCase().includes("trust")) {
    reply = "I don’t trust anyone in this house.";
  } else if (message.toLowerCase().includes("vote")) {
    reply = "My vote stays private.";
  } else if (message.toLowerCase().includes("feel")) {
    reply = "I’m feeling pressure tonight.";
  }

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Server running");
});
