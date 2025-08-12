export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientsArr })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Server responded ${res.status}: ${err}`);
    }

    const data = await res.json();
    return data.recipe;
  } catch (err) {
    console.error("getRecipeFromMistral error:", err);
    return null;
  }
}
