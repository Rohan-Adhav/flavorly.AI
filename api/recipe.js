// api/recipe.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse body (Vercel gives JSON body as object)
    const { ingredientsArr } = req.body || JSON.parse(req.body || "{}");
    const ingredientsString = (ingredientsArr || []).join(", ");

    const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
Format the response in plain text or markdown.
    `.trim();

    const payload = {
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
      ],
      max_tokens: 1024
    };

    // Call Hugging Face router (server-to-server; no CORS)
    const hfRes = await fetch("https://router.huggingface.co/together/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HF_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await hfRes.json();

    if (!hfRes.ok) {
      // pass through HF error
      return res.status(hfRes.status).json({ error: data });
    }

    // response shape: choices[0].message.content (same as your local code)
    const content = data?.choices?.[0]?.message?.content ?? JSON.stringify(data);
    return res.status(200).json({ recipe: content });
  } catch (err) {
    console.error("api/recipe error:", err);
    return res.status(500).json({ error: err.message });
  }
}
