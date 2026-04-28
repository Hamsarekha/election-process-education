import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(express.static("."));

const API_KEY = process.env.GROQ_API_KEY;

app.post("/ask", async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an election education assistant. Answer questions about elections, voting, and democracy simply and clearly."
            },
            {
              role: "user",
              content: userInput
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));

    const reply = data?.choices?.[0]?.message?.content;

    res.json({ reply: reply || "No response from AI" });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server running on port", PORT);
});