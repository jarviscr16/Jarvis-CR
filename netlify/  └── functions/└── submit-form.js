exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const webhook = "PASTE_DISCORD_WEBHOOK_HERE";

    const payload = {
      username: "Jarvis CR Website",
      embeds: [{
        title: "📩 New Coaching Request",
        color: 16766720,
        fields: [
          { name: "Discord", value: data.discord },
          { name: "IGN", value: data.ign },
          { name: "Email", value: data.email },
          { name: "Deck", value: data.deck || "N/A" },
          { name: "Plan", value: data.plan }
        ]
      }]
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return { statusCode: 200 };
  } catch (err) {
    return { statusCode: 500 };
  }
};
