'use client';
import { useRouter } from 'next/navigation';

export default function RecipeSaveButton({ recipeJson }) {
  const router = useRouter();

  const handleSaveRecipe = async () => {
    const response = fetch('/api/recipe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeJson),
    });

    router.push('/recipe/collection');
  };

  return (
    <button className="actionButton" onClick={handleSaveRecipe}>
      Save Recipe
    </button>
  );
}
