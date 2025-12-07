export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const data = JSON.parse(event.body);

  const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";

  const payload = {
    embeds: [
      {
        title: "📩 New Coaching Request",
        color: 15844367,
        fields: [
          { name: "Discord Username", value: data.discord || "N/A", inline: true },
          { name: "In-Game Name", value: data.ingame || "N/A", inline: true },
          { name: "Email", value: data.email || "N/A", inline: false },
          { name: "Main Deck", value: data.deck || "N/A", inline: false },
          { name: "Plan", value: data.plan || "N/A", inline: true }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
}
