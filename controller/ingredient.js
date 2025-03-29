import { getAllIngredients } from "@/model/ingredient";

export function getIngredients() {
  return "controller.getIngredients()." + getAllIngredients();
}
