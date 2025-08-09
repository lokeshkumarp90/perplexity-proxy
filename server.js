import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Allow CORS for all origins
app.use(express.json());

const API_KEY = process.env.PERPLEXITY_API_KEY;
const ENDPOINT = "https://api.perplexity.ai/chat/completions";

app.post("/call-api", async (req, res) => {
  try {
    const messages = req.body.messages;

    const body = {
      model: "sonar-pro",
      messages: messages
    };

    const apiRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(10000, () => console.log("Server running on port 10000"));
