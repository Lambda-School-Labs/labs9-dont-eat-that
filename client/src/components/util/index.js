export const getTopRatedRecipes = recipesArray => {
  const compare = (a, b) => {
    if (a.ratings.length > 0 && b.ratings.length > 0) {
      return getAveRating(b.ratings) - getAveRating(a.ratings);
    }
    if (a.ratings.length > 0) return -1;

    return 1;
  };

  return recipesArray.sort(compare);
};

const getAveRating = ratings => {
  let sumRating = 0;
  if (ratings.length < 1) return 0;

  for (let i = 0; i < ratings.length; i++) sumRating += ratings[i].rating;

  return sumRating / ratings.length;
};

export const searchFunc = (query, recipes) => {
  // checkIngredient function checks if a recipe's ingredient names has search query
  // and returns true or false

  const checkIngredient = recipe => {
    const result = recipe.ingredients.filter(ingredient => {
      //   let ingredientName = ingredient.name.toUpperCase();
      return ingredient.name.toUpperCase().indexOf(query.toUpperCase()) >= 0;
    });

    // filter returns array and even empty array is truthy.
    // so check the length and return true or false

    return result.length > 0 ? true : false;
  };
  // returns recipes that has search query in recipe name or ingredient name
  return recipes.filter(recipe => {
    // let recipeName = recipe.name.toUpperCase();

    return (
      recipe.name.toUpperCase().indexOf(query.toUpperCase()) >= 0 ||
      checkIngredient(recipe)
    );
  });
};

// below function return a content for one recipe for download Excel file
function getARecipeContent(keys, recipe) {
  let ctr = 0;

  let recipeContent = '';
  const columnDelimiter = ',';

  keys.forEach(function(key) {
    let temp = '';
    if (ctr > 0) recipeContent += columnDelimiter;
    if (key === 'ingredients') {
      recipe.ingredients.forEach(ingredient => {
        let ingName = ingredient.name.toString().replace(/[,\n]/g, '');
        recipeContent +=
          ingName +
          ' ' +
          ingredient.quantity +
          ' ' +
          ingredient.unit +
          columnDelimiter;
      });
    } else {
      temp += recipe[key] ? recipe[key].toString() : '';
      temp = temp.replace(/[,\n]/g, '');
      temp = temp.replace(/<[^>]*>/g, ' ');
      recipeContent += temp;
    }
    ctr++;
  });
  console.log(recipeContent);
  return recipeContent;
}

// below function download an excel file with recipe contents
// Argument can be 1 recipe object or array of recipe objects.

export const downloadRecipeToCSV = recipes => {
  let filename, link, csv, keys, columnDelimiter, lineDelimiter;
  columnDelimiter = ',';
  lineDelimiter = '\n';
  filename = 'recipe.csv';
  let temp = '';
  // keys = Object.keys(recipe);
  keys = ['id', 'name', 'description', 'ingredients'];

  console.log('Download Util  recipe = ', recipes);
  console.log('Keys = ', keys);

  csv = '';
  csv += keys.join(columnDelimiter);
  csv += lineDelimiter;

  if (recipes.length > 0) {
    recipes.forEach(function(recipe) {
      temp += getARecipeContent(keys, recipe) + lineDelimiter;
    });
  } else temp = getARecipeContent(keys, recipes);

  csv += temp;

  // });
  csv += lineDelimiter;
  // });

  if (csv == null) return;

  csv = 'data:text/csv;charset=utf-8,' + csv;

  link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
};

export const ratingsFunc = recipe => {
  if (!recipe.ratings || !recipe.ratings[0]) {
    return 0;
  } else {
    const ratingArr = recipe.ratings.map(rating => rating.rating);
    const avgRating =
      ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
    return Math.round(avgRating);
  }
};
