export default function RecipeSaveButton({ recipeJson }) {
  const handleSaveRecipe = async () => {
    const response = fetch('/api/recipe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeJson),
    });
  };

  return <button onClick={handleSaveRecipe}>Save Recipe</button>;
}
