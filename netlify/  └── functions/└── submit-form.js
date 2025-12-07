exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const webhookURL = "https://discord.com/api/webhooks/1447076466096472275/BzdrUaq8ojeRWpNz_qwNVSWDA7WvxAWJ0OEwnOVxBtKx-y8URpah_yRtKvhj5v_spqPy";

  const payload = {
    username: "Jarvis CR Coaching",
    embeds: [
      {
        title: "📩 New Coaching Request",
        color: 15844367,
        fields: [
          { name: "Discord ID", value: data.discord || "N/A" },
          { name: "In-Game Name", value: data.ign || "N/A" },
          { name: "Email", value: data.email || "N/A" },
          { name: "Main Deck", value: data.deck || "N/A" },
          { name: "Plan", value: data.plan || "N/A" }
        ],
        footer: { text: "Jarvis CR Website" }
      }
    ]
  };

  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
