const webhookURL = "YOUR_WEBHOOK_URL_HERE";

// Auto-fill selected plan from URL
const params = new URLSearchParams(window.location.search);
const selectedPlan = params.get("plan");
if (selectedPlan) {
  document.getElementById("plan").value = selectedPlan;
}

document.getElementById("requestForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    username: "Jarvis CR Requests",
    embeds: [{
      title: "New Coaching Request",
      color: 16766720,
      fields: [
        { name: "Discord ID", value: document.getElementById("discord").value, inline: true },
        { name: "In-Game Name", value: document.getElementById("ign").value, inline: true },
        { name: "Email", value: document.getElementById("email").value, inline: false },
        { name: "Main Deck", value: document.getElementById("deck").value || "Not provided", inline: false },
        { name: "Chosen Plan", value: document.getElementById("plan").value, inline: false }
      ],
      footer: { text: "Jarvis CR Coaching" }
    }]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("Request sent! I’ll contact you on Discord.");
    document.getElementById("requestForm").reset();
  })
  .catch(() => {
    alert("Error sending request. Try again.");
  });
});
