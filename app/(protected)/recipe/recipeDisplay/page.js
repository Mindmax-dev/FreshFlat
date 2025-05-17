'use client';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

export default function RecipeDisplay() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(`/api/recipe/${searchParams.get('id')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to load recipe');
          return;
        }
        setRecipe(await response.json());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    getRecipe();
  }, [searchParams]);

  return <p>{loading ? 'Loading' : 'Not loading'}</p>;
}
