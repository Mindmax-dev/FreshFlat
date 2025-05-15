// Return a "page under construction"
'use client';

import { useRouter } from 'next/navigation';

export default function RecipeCollectionPage() {
  const router = useRouter();

  return (
    <div>
      <button
        className="actionButton"
        onClick={() => router.push('/recipe/selectIngredients')}
      >
        Generate Recipe
      </button>
    </div>
  );
}
