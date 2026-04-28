// JOURNEY
const steps = [
  "Register with Voter ID",
  "Understand candidates",
  "Vote using EVM",
  "Counting votes",
  "🎉 Completed!"
];

let stepIndex = 0;

function updateTimeline() {
  const elements = document.querySelectorAll(".step");

  elements.forEach((el, i) => {
    el.classList.remove("active", "done");

    if (i < stepIndex) el.classList.add("done");
    else if (i === stepIndex) el.classList.add("active");
  });
}

function nextStep() {
  document.getElementById("journeyText").innerText = steps[stepIndex];
  updateTimeline();

  if (stepIndex < steps.length - 1) stepIndex++;
}

// LEARN
function showInfo(step) {
  const data = {
    registration: `
📝 REGISTRATION

Before voting, every citizen must register with the Election Commission.

• You must be 18 years or older  
• Apply online or offline for a Voter ID (EPIC)  
• Provide proof of identity and address  
• Once approved, your name appears in the electoral roll  

👉 Without registration, you cannot vote.
    `,

    campaign: `
📢 CAMPAIGN

Candidates and political parties communicate their ideas to voters.

• They organize rallies, speeches, and advertisements  
• Share plans for development, economy, and society  
• Try to convince voters to support them  

👉 This helps voters make informed decisions.
    `,

    voting: `
🗳️ VOTING

On election day, citizens cast their vote.

• Go to your assigned polling booth  
• Verify identity using Voter ID or valid document  
• Vote using an Electronic Voting Machine (EVM)  
• Your vote is secret and secure  

👉 Every vote counts equally.
    `,

    counting: `
📊 COUNTING

After voting ends, all votes are counted.

• EVMs are opened under strict supervision  
• Officials count votes carefully  
• Results are announced publicly  

👉 The candidate with the highest votes wins.
    `,

    importance: `
⭐ WHY ELECTIONS MATTER

Elections are the foundation of democracy.

• Citizens choose their leaders  
• Government becomes accountable to people  
• Ensures fair representation  
• Allows peaceful change of power  

👉 Voting is both a right and a responsibility.
    `
  };

  document.getElementById("infoBox").innerText = data[step];
}

// AI
async function askAI() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const text = input.value;
  if (!text) return;

  chatBox.innerHTML += `<div class="message user">${text}</div>`;
  input.value = "";

  chatBox.innerHTML += `<div class="message ai">Thinking...</div>`;

  try {
    const res = await fetch("https://election-service-766618428685.asia-south1.run.app/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    const msgs = document.querySelectorAll(".ai");
    msgs[msgs.length - 1].innerText = data.reply || "No response";

  } catch (err) {
    const msgs = document.querySelectorAll(".ai");
    msgs[msgs.length - 1].innerText = "❌ Error connecting to AI";
    console.error(err);
  }
}

// QUIZ
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
    options: [
      "To select leaders",
      "For entertainment",
      "For holidays"
    ],
    answer: "To select leaders"
  }
];

let q = 0, score = 0;

function loadQuiz() {
  document.getElementById("question").innerText = quiz[q].q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  quiz[q].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => check(opt);
    optionsDiv.appendChild(btn);
  });
}

function check(ans) {
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === quiz[q].answer) {
      btn.style.background = "green";
    } else {
      btn.style.background = "red";
    }
  });

  if (ans === quiz[q].answer) score++;

  setTimeout(() => {
    q++;
    if (q < quiz.length) {
      loadQuiz();
    } else {
      document.getElementById("question").innerText = "🎉 Quiz Completed!";
      document.getElementById("options").innerHTML = "";
      document.getElementById("score").innerText =
        "Your Score: " + score + "/" + quiz.length;
    }
  }, 1000);
}

if (document.getElementById("question")) {
    loadQuiz();
}