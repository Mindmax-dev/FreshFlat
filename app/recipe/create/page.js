'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateRecipe() {
  const searchParams = useSearchParams();

  const [recipeJson, setRecipeJson] = useState(null);
  const difficulty = searchParams.get('difficulty');
  const ingredients = searchParams.get('ingredients');

  useEffect(() => {
    const generateRecipe = async () => {
      try {
        const response = await fetch('/api/recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredients: ingredients,
            difficulty: difficulty,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipeGenerationResponse = await response.json();

        setRecipeJson(JSON.parse(recipeGenerationResponse));
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipeJson(null);
      }
    };

    generateRecipe();
  }, [difficulty, ingredients]);

  useEffect(() => {
    console.log(typeof recipeJson);
    console.log('Recipe JSON:', recipeJson?.title);
  }, [recipeJson]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      {recipeJson ? (
        <div className="bg-white shadow-md rounded-lg p-4 w-1/2">
          <h2 className="text-xl font-semibold mb-2">{recipeJson.title}</h2>
          <p className="mb-2">
            <strong>Preparation Time:</strong> {recipeJson.preparation_time}{' '}
            minutes
          </p>
          <p className="mb-2">
            <strong>Cooking Time:</strong> {recipeJson.cooking_time} minutes
          </p>
          <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {recipeJson.ingredients.map((ingredient, index) => (
              <li key={index + ingredient.name}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4">Instructions:</h3>
          <p className="whitespace-pre-wrap">{recipeJson.instructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
