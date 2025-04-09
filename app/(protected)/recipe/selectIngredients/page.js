import { getFlatIngredients } from '@/controller/ingredient';
import SelectIngredientsPage from '@/components/recipe/selectIngredientsPage';

export default async function SelectIngredients() {
  const flatIngredient = await getFlatIngredients();

  return (
    <SelectIngredientsPage
      flatIngredients={flatIngredient.map((ingredient) => ({
        quantity: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.ingredient,
        created_by: ingredient.user,
        expiry_date: ingredient.expiry_date,
        selected: true,
      }))}
    />
  );
}
