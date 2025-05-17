import { getFlatIngredients } from '@/controller/ingredient';
import ViewPage from '@/components/recipe/viewPage';

export default async function SelectIngredients() {
  const flatIngredient = await getFlatIngredients();

  return (
    <ViewPage
      flatIngredients={flatIngredient.map((ingredient) => ({
        quantity: ingredient.amount,
        unit: 'VIEW BABY',
        name: ingredient.ingredient,
        created_by: ingredient.user,
        expiry_date: ingredient.expiry_date,
        selected: true,
      }))}
    />
  );
}
