import express from "express";
import cors from "cors";
import compression from "compression";

const app = express();

// Security headers
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "DENY");
  res.set("X-XSS-Protection", "1; mode=block");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(compression());
app.use(express.json({ limit: "10kb" }));

// Cache static files
app.use(express.static(".", {
  maxAge: "1h",
  etag: true
}));

const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  console.error("❌ GROQ_API_KEY is not set!");
  process.exit(1);
}

// Rate limiting (simple in-memory)
const requestCounts = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 1000;

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = requestCounts.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW) {
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }

  requestCounts.set(ip, entry);

  if (entry.count > RATE_LIMIT) {
    return res.status(429).json({ reply: "Too many requests. Please wait a moment." });
  }

  next();
}

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI route
app.post("/ask", rateLimit, async (req, res) => {
  const userInput = req.body.message;

  if (!userInput || typeof userInput !== "string") {
    return res.status(400).json({ reply: "Please enter a valid question." });
  }

  const trimmed = userInput.trim();

  if (trimmed.length === 0) {
    return res.status(400).json({ reply: "Please enter a valid question." });
  }

  if (trimmed.length > 500) {
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
          max_tokens: 512,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: "You are VoteSmart AI, an election education assistant for Indian citizens. Answer questions about elections, voting, democracy, EVMs, voter registration, and election commission clearly and simply. Keep answers concise and easy to understand."
            },
            {
              role: "user",
              content: trimmed
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.error("Groq API error:", errData);
      return res.status(502).json({ reply: "AI service is temporarily unavailable. Please try again." });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ reply: "No response from AI. Please try again." });
    }

    res.json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ reply: "Internal server error." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server running on port", PORT);
});