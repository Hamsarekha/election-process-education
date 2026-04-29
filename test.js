// VoteSmart - Full Test Suite
const BASE_URL = "https://election-service-766618428685.asia-south1.run.app";

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log("✅ PASS:", name);
    passed++;
  } catch (err) {
    console.log("❌ FAIL:", name, "-", err.message);
    failed++;
  }
}

// 1. Health check
await test("Health endpoint returns ok", async () => {
  const res = await fetch(BASE_URL + "/health");
  const data = await res.json();
  if (data.status !== "ok") throw new Error("Health check failed");
});

// 2. Index page served
await test("index.html is served", async () => {
  const res = await fetch(BASE_URL + "/index.html");
  if (!res.ok) throw new Error("index.html not found");
});

// 3. AI page served
await test("ai.html is served", async () => {
  const res = await fetch(BASE_URL + "/ai.html");
  if (!res.ok) throw new Error("ai.html not found");
});

// 4. Quiz page served
await test("quiz.html is served", async () => {
  const res = await fetch(BASE_URL + "/quiz.html");
  if (!res.ok) throw new Error("quiz.html not found");
});

// 5. Journey page served
await test("journey.html is served", async () => {
  const res = await fetch(BASE_URL + "/journey.html");
  if (!res.ok) throw new Error("journey.html not found");
});

// 6. Learn page served
await test("learn.html is served", async () => {
  const res = await fetch(BASE_URL + "/learn.html");
  if (!res.ok) throw new Error("learn.html not found");
});

// 7. CSS served
await test("style.css is served", async () => {
  const res = await fetch(BASE_URL + "/style.css");
  if (!res.ok) throw new Error("style.css not found");
});

// 8. JS served
await test("script.js is served", async () => {
  const res = await fetch(BASE_URL + "/script.js");
  if (!res.ok) throw new Error("script.js not found");
});

// 9. AI responds to valid question
await test("AI responds to valid election question", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "What is voting?" })
  });
  const data = await res.json();
  if (!data.reply) throw new Error("No reply received");
  if (data.reply === "No response from AI") throw new Error("Empty AI reply");
});

// 10. AI responds to another question
await test("AI responds to EVM question", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "What is EVM?" })
  });
  const data = await res.json();
  if (!data.reply) throw new Error("No reply received");
});

// 11. Empty input rejected
await test("Empty message is rejected", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "" })
  });
  if (res.status !== 400) throw new Error("Expected 400 status");
});

// 12. Missing message rejected
await test("Missing message field rejected", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  if (res.status !== 400) throw new Error("Expected 400 status");
});

// 13. Long input rejected
await test("Message over 500 chars is rejected", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "a".repeat(600) })
  });
  if (res.status !== 400) throw new Error("Expected 400 status");
});

// 14. Response is valid JSON
await test("Response is valid JSON with reply field", async () => {
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "How do I register to vote?" })
  });
  const data = await res.json();
  if (typeof data !== "object") throw new Error("Not an object");
  if (!("reply" in data)) throw new Error("No reply field");
});

// 15. Security headers present
await test("Security headers are present", async () => {
  const res = await fetch(BASE_URL + "/health");
  if (!res.headers.get("x-content-type-options")) throw new Error("Missing X-Content-Type-Options");
  if (!res.headers.get("x-frame-options")) throw new Error("Missing X-Frame-Options");
});

console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
if (failed === 0) {
  console.log("🎉 All tests passed!");
} else {
  console.log("⚠️ Some tests failed. Check above for details.");
}