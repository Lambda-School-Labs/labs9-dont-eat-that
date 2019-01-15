export const searchFunc = (query, recipes) => {
    console.log("recipes", recipes)

//    const checkIngredient = (recipe) => {
//     if(){
//         console.log('CheckIngr  recipe = ', recipe);
//            console.log('CheckIngre ingredient = ', recipe.ingredients);
//             return recipe.ingredients.map ( ingredient => 
//                 ingredient.name.includes(query) )

//     }   
    
//    }
//   return recipes.filter( recipe => recipe.ingredients.filter (ingredient => ingredient.name.includes(query)));



    return recipes.filter(
        recipe => recipe.name.includes(query) 
        // || checkIngredient(recipe)
    );

  };

//   console.log(ingredient)