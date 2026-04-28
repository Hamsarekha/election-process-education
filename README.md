![Preview](screenshot.png)
## Election Process Education Platform

An interactive and AI-powered web application that helps users understand the **election process** in a simple, engaging, and modern way.

---

## Live Website
https://election-service-766618428685.asia-south1.run.app

---

## Overview
This project is designed to educate users about elections through interactive modules, quizzes, and an AI-powered assistant. It simplifies concepts like voting, democracy, and election procedures into easy-to-understand content.

---

## Features

### Interactive Journey
- Step-by-step election process:
  - 📝 Register
  - 🧑‍💼 Candidates
  - 🗳️ Vote
  - 📊 Counting 
- Interactive card-based UI

---

### Learn Section
- What is voting
- What is democracy
- Why elections matter
- Beginner-friendly explanations 

---

### Quiz Module
- Multiple choice questions
- Instant feedback
- Interactive UI

---

### Ask AI
- Ask questions about elections
- AI gives simple and clear answers 
- Powered by Groq API (LLaMA 3)

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### AI Integration
- Groq API (LLaMA 3)

### Deployment
- Google Cloud Run

---

## Project Structure


election-process-education/
│
├── index.html
├── learn.html
├── journey.html
├── quiz.html
├── ai.html
│
├── style.css
├── script.js
│
├── server.js
├── package.json
├── Dockerfile
│
└── README.md

---

##  Run Locally

```bash
npm install
node server.js

Open in browser:

http://localhost:8080

---

## Deployment
gcloud run deploy election-service \
--source . \
--region asia-south1 \
--allow-unauthenticated \
--set-env-vars GROQ_API_KEY=YOUR_API_KEY

---

## Future Improvements
Chat history
Voice input
Multi-language support
UI enhancements

--

## Author

S Hamsarekha


