import express from "express";
import cors from "cors";
import compression from "compression";

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(express.static("."));

const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  console.error("❌ GROQ_API_KEY is not set!");
  process.exit(1);
}

app.post("/ask", async (req, res) => {
  const userInput = req.body.message;

  if (!userInput || typeof userInput !== "string") {
    return res.status(400).json({ reply: "Please enter a valid question." });
  }

  if (userInput.length > 500) {
    return res.status(400).json({ reply: "Message too long. Please keep it under 500 characters." });
  }

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
    console.error("Server error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server running on port", PORT);
});