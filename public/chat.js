import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const completion = await openrouter.chat.send({
      model: "google/gemma-3-27b-it:free",
      messages: messages
    });

    return res.status(200).json({ 
      role: "assistant",
      content: completion.choices[0].message.content 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
