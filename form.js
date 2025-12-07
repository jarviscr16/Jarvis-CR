const webhookURL = "PASTE_YOUR_DISCORD_WEBHOOK_HERE";

const params = new URLSearchParams(window.location.search);
const selectedPlan = params.get("plan");

if (selectedPlan) {
  document.getElementById("planSelect").value = selectedPlan;
}

document.getElementById("requestForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "New Coaching Request",
        color: 16763904,
        fields: [
          { name: "Plan", value: data.plan },
          { name: "Discord", value: data.discord },
          { name: "IGN", value: data.ign },
          { name: "Email", value: data.email },
          { name: "Deck", value: data.deck || "N/A" }
        ]
      }]
    })
  });

  alert("Request sent! Check Discord ✅");
  e.target.reset();
});
