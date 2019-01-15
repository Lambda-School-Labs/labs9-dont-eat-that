export const searchFunc = (query, recipes) => {
    return recipes.filter(
        recipe => recipe.name.includes(query) 
    //   || recipes.ingredients.includes(query)
    );
  };