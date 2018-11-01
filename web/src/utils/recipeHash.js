export default function recipeHash(recipe) {
  return `${recipe.title}${recipe.directions ? recipe.directions.length : 123}${recipe.instructions ? recipe.instructions.length : 321}`;
}