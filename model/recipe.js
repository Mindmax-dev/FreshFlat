export default class Recipe {
  constructor(id, title, ingredients) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
  }

  getRecipeTitle() {
    return this.title;
  }

  getRecipeId() {
    return this.id;
  }

  setRecipeTitle(title) {
    this.title = title;
  }

  setRecipeId(id) {
    this.id = id;
  }

  // #
  saveRecipeToDatabase() {
    // save to database
  }
}
