// ===== AI CHAT =====
async function askAI() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (!input || !chatBox) return;

  const text = input.value.trim();
  if (!text) return;

  if (text.length > 500) {
    alert("Please keep your question under 500 characters.");
    return;
  }

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);

  input.value = "";

  // Show thinking indicator
  const thinkingMsg = document.createElement("div");
  thinkingMsg.className = "message ai";
  thinkingMsg.textContent = "Thinking...";
  chatBox.appendChild(thinkingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("https://election-service-766618428685.asia-south1.run.app/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    const data = await res.json();
    thinkingMsg.textContent = data.reply || "No response received.";

  } catch (err) {
    thinkingMsg.textContent = "❌ Error connecting to AI. Please try again.";
    console.error("AI error:", err);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// ===== QUIZ =====
const quiz = [
  {
    q: "What is the minimum voting age in India?",
    options: ["16", "18", "21"],
    answer: "18"
  },
  {
    q: "Which body conducts elections in India?",
    options: ["Supreme Court", "Election Commission", "Parliament"],
    answer: "Election Commission"
  },
  {
    q: "What is used to cast votes electronically?",
    options: ["Scanner", "EVM", "Computer"],
    answer: "EVM"
  },
  {
    q: "When are votes counted?",
    options: ["Before voting", "After voting", "During voting"],
    answer: "After voting"
  },
  {
    q: "Why are elections important?",
    options: ["To select leaders", "For entertainment", "For holidays"],
    answer: "To select leaders"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  if (!questionEl || !optionsEl) return;

  const current = quiz[currentQuestion];
  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.setAttribute("aria-label", "Answer: " + opt);
    btn.addEventListener("click", () => checkAnswer(opt));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const buttons = document.querySelectorAll("#options button");
  const correct = quiz[currentQuestion].answer;

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#16a34a";
    } else if (btn.textContent === selected) {
      btn.style.background = "#dc2626";
    }
  });

  if (selected === correct) score++;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      loadQuiz();
    } else {
      const questionEl = document.getElementById("question");
      const optionsEl = document.getElementById("options");
      const scoreEl = document.getElementById("score");

      questionEl.textContent = "🎉 Quiz Completed!";
      optionsEl.innerHTML = "";
      scoreEl.textContent = "Your Score: " + score + "/" + quiz.length;
    }
  }, 1000);
}

// Initialize quiz only on quiz page
if (document.getElementById("question")) {
  loadQuiz();
}