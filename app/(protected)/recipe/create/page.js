'use client';

import { Suspense } from 'react';
import { Mosaic } from 'react-loading-indicators';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Recipe from '@/components/recipe/recipe';

export default function CreateRecipe() {
  return (
    <Suspense fallback={<Mosaic color="#32cd32" size="medium" text="" textColor="" />}>
      <RecipeFetcher />
    </Suspense>
  );
}

function RecipeFetcher() {
  const searchParams = useSearchParams();
  const [recipeJson, setRecipeJson] = useState(null);
  const difficulty = searchParams.get('difficulty');
  const ingredients = searchParams.get('ingredients');

  useEffect(() => {
    const generateRecipe = async () => {
      try {
        const response = await fetch('/api/recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients, difficulty }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const recipeGenerationResponse = await response.json();
        setRecipeJson(JSON.parse(recipeGenerationResponse));
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipeJson(null);
      }
    };

    generateRecipe();
  }, [difficulty, ingredients]);

  return recipeJson ? <Recipe recipeJson={recipeJson} /> : null;
}
