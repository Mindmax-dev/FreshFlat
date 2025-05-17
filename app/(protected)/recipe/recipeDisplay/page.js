'use client';
import { useSearchParams } from 'next/navigation';

export default function SelectIngredients() {
  const searchParams = useSearchParams();
  return (
    <>
      <p>{searchParams.get('title')}</p>
      <p>{searchParams.get('instructions')}</p>
      <p>{searchParams.get('difficulty')}</p>
      <p>{searchParams.get('preparation_time')}</p>
      <p>{searchParams.get('cooking_time')}</p>
    </>
  );
}
