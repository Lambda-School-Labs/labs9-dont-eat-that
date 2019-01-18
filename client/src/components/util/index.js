export const searchFunc = (query, recipes) => {


    // checkIngredient function checks if a recipe's ingredient names has search query
    // and returns true or false
    
   const checkIngredient = (recipe) => {
     
    const result = recipe.ingredients.filter ( ingredient => {
        let ingredientName = ingredient.name.toUpperCase();
         return  ingredientName.includes(query.toUpperCase());
           }       ) 
    
        // filter returns array and even empty array is truthy.  
        // so check the length and return true or false
        
        return result.length > 0 ? true : false;
   }    
    // returns recipes that has search query in recipe name or ingredient name
    console.log('Search index.js recipes = ', recipes);
    return recipes.filter(
        
        recipe => {
            let recipeName = recipe.name.toUpperCase();
            
        return recipeName.includes(query.toUpperCase()) || checkIngredient(recipe)

        }
     
     );
}


