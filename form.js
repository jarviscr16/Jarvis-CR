const webhookURL = "PASTE_YOUR_DISCORD_WEBHOOK_HERE";

const params = new URLSearchParams(window.location.search);
const selectedPlan = params.get("plan");
if (selectedPlan) {
  document.getElementById("planSelect").value = selectedPlan;
}

document.getElementById("requestForm").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const payload = {
    username: "Jarvis CR Website",
    embeds: [{
      title: "🔥 New Coaching Request",
      color: 16766720,
      fields: [
        { name: "📌 Plan", value: data.plan, inline: false },
        { name: "🎮 IGN", value: data.ign, inline: true },
        { name: "💬 Discord", value: data.discord, inline: true },
        { name: "📧 Email", value: data.email, inline: false },
        { name: "🧠 Main Deck", value: data.deck || "Not provided", inline: false }
      ],
      footer: { text: "Jarvis CR Coaching" },
      timestamp: new Date()
    }]
  };

  try {
    const res = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Webhook failed");

    alert("✅ Request sent successfully!");
    form.reset();
  } catch (err) {
    alert("❌ Failed to send. Host the site (GitHub Pages / Netlify).");
    console.error(err);
  }
});
