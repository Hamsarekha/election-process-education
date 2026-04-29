![Preview](screenshot.png)
## Election Process Education Platform
=======
# VoteSmart — AI-Powered Election Education Platform

An interactive web platform that educates Indian citizens about the election process using AI.

---

## Live Website
=======
## Live Demo
https://election-service-766618428685.asia-south1.run.app

## Features
- **Interactive Election Journey** — Step-by-step visual guide
- **Learn Concepts** — Voting, EVM, Election Commission, Results
- **Quiz Yourself** — Test your civic knowledge
- **Ask AI** — Powered by Groq Llama 3.3-70B

## Overview
This project is designed to educate users about elections through interactive modules, quizzes, and an AI-powered assistant. It simplifies concepts like voting, democracy, and election procedures into easy-to-understand content.
=======
## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js + Express
- **AI:** Groq API (Llama 3.3-70B)
- **Deployment:** Google Cloud Run
- **Analytics:** Google Analytics (GA4)
- **Fonts:** Google Fonts (Inter)


## Setup & Installation


## Features

### Interactive Journey
- Step-by-step election process:
  -  Register
  -  Candidates
  -  Vote
  -  Counting 
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

##  Project Structure

```
election-process-education/
├── index.html
├── learn.html
├── journey.html
├── quiz.html
├── ai.html
├── style.css
├── script.js
├── server.js
├── package.json
├── Dockerfile
└── README.md
```

---

##  Run Locally
=======
### Prerequisites
- Node.js >= 18.0.0
- Groq API key (free at console.groq.com)
>>>>>>> 590e68a (Updated project changes)

### 1. Clone and install
```bash
git clone <repo-url>
cd votesmart
npm install
<<<<<<< HEAD
node server.js
```
Open in browser:
=======
```

### 2. Set environment variables
```bash
export GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run locally
```bash
npm start
```


---

## Future Improvements
- Chat history
- Voice input
- Multi-language support
- UI enhancements

---

## Author

S Hamsarekha


=======
### 4. Deploy to Google Cloud Run
```bash
gcloud run deploy election-service --source . --region asia-south1
```

## Run Tests
```bash
node test.js
```

## Project Structure
```
votesmart/
├── server.js        # Express backend with Groq AI integration
├── script.js        # Frontend JavaScript
├── style.css        # Responsive styles
├── index.html       # Home page
├── ai.html          # AI Chat page
├── quiz.html        # Quiz page
├── journey.html     # Election Journey page
├── learn.html       # Learn Concepts page
├── test.js          # Test suite
├── package.json     # Dependencies
└── README.md        # Documentation
```

## Security Features
- Input validation and sanitization
- Rate limiting (20 requests/minute per IP)
- Security headers (X-Frame-Options, XSS Protection, etc.)
- Request size limiting (10kb)

## Accessibility
- ARIA labels on all interactive elements
- Semantic HTML (main, header, footer, article, nav)
- Screen reader support
- Keyboard navigation support
- Focus indicators on all interactive elements

## Performance
- Gzip compression enabled
- Static file caching (1 hour)
- Google Fonts preconnect
- DNS prefetch for API

