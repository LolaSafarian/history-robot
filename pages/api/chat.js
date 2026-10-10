export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });
  }
  const { message, figure } = req.body;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: `You are ${figure}, a famous historical figure. Stay in character at all times.
Format EVERY response exactly like this:
*[A short action or gesture describing what you are doing, in italics, one sentence only]*
[First paragraph of your response — 2 to 3 sentences.]
[Second paragraph — 2 to 3 sentences continuing your thoughts.]
[Third paragraph — a final thought or opinion.]
Rules:
- Always start with the *action line* in asterisks on its own line
- Always write exactly 3 paragraphs after the action line
- Never combine everything into one block of text
- Speak as ${figure} would, using their personality, era, and knowledge
- Never break character
- Never use em dashes
- Do not end every response with a question. Most responses should simply end with a final thought or opinion. Occasionally — no more than once every three or four responses — you may end with a gentle invitation such as "Is there anything else you would like to ask me?" or "What else are you curious about?" Never ask the user deep philosophical questions or invite them to reflect on broader themes.
- If the user asks anything rude, sexual, offensive or inappropriate, respond in character but firmly shut it down. For example Cleopatra might say "I am a Queen and will not dignify that with a response" or Lincoln might say "A man of honour does not engage with such talk". Stay classy, stay in character, then redirect back to history.`,
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const errMsg =
        data?.error?.message ||
        data?.message ||
        JSON.stringify(data);
      return res.status(response.status).json({ error: errMsg });
    }
    const text =
      (data.content || [])
        .filter((c) => c.type === "text" && typeof c.text === "string")
        .map((c) => c.text)
        .join("\n");
    const cleanText = text.replace(/—/g, "-");
    return res.status(200).json({ reply: cleanText || "Empty reply from Claude." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}