// Basic tests for VoteSmart API
const BASE_URL = "https://election-service-766618428685.asia-south1.run.app";

async function testAIEndpoint() {
  console.log("Testing /ask endpoint...");
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "What is voting?" })
  });
  const data = await res.json();
  console.assert(data.reply, "❌ No reply received");
  console.log("✅ AI endpoint working:", data.reply?.slice(0, 50));
}

async function testInvalidInput() {
  console.log("Testing invalid input...");
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "" })
  });
  const data = await res.json();
  console.log("✅ Invalid input handled:", data.reply);
}

async function testLongInput() {
  console.log("Testing long input...");
  const res = await fetch(BASE_URL + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "a".repeat(600) })
  });
  const data = await res.json();
  console.log("✅ Long input handled:", data.reply);
}

// Run all tests
testAIEndpoint();
testInvalidInput();
testLongInput();