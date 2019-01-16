export const searchFunc = (query, recipes) => {


    // checkIngredient function checks if a recipe's ingredient names has search query
    // and returns true or false
    
   const checkIngredient = (recipe) => {
     
    const result = recipe.ingredients.filter ( ingredient => 
                ingredient.name.includes(query) ) 
    
        // filter returns array and even empty array is truthy.  
        // so check the length and return true or false
        
        return result.length > 0 ? true : false;
    }   
    
    // returns recipes that has search query in recipe name or ingredient name
    return recipes.filter(
        recipe => recipe.name.includes(query)  || checkIngredient(recipe)
    );
};
