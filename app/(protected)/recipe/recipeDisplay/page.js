'use client';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { useEffect } from 'react';

export default function RecipeDisplay() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(`/api/recipe/${searchParams.get('id')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    getRecipe();
  }, [searchParams]);

  return <p>Hello</p>;
}
