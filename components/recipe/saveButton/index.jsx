'use client';
import { useRouter } from 'next/navigation';

export default function RecipeSaveButton({ recipeJson, difficulty }) {
  const router = useRouter();

  const handleSaveRecipe = async () => {
    fetch('/api/recipe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeJson: recipeJson,
        difficulty: difficulty,
      }),
    });

    router.push('/recipe/collection');
  };

  return (
    <button className="actionButton" onClick={handleSaveRecipe}>
      Save Recipe
    </button>
  );
}
