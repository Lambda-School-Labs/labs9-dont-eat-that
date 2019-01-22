export const searchFunc = (query, recipes) => {
  // checkIngredient function checks if a recipe's ingredient names has search query
  // and returns true or false

  const checkIngredient = recipe => {
    const result = recipe.ingredients.filter(ingredient => {
      //   let ingredientName = ingredient.name.toUpperCase();
      return ingredient.name.toUpperCase().includes(query.toUpperCase());
    });

    // filter returns array and even empty array is truthy.
    // so check the length and return true or false

    return result.length > 0 ? true : false;
  };
  // returns recipes that has search query in recipe name or ingredient name
  console.log('Search index.js recipes = ', recipes);
  return recipes.filter(recipe => {
    // let recipeName = recipe.name.toUpperCase();

    return (
      recipe.name.toUpperCase().includes(query.toUpperCase()) ||
      checkIngredient(recipe)
    );
  });
};

export const downloadRecipesToCSV = recipes => {
  let filename, link, csv, keys, columnDelimiter, lineDelimiter;
  columnDelimiter = ',';
  lineDelimiter = '\n';
  filename = 'recipes.csv';

  keys = Object.keys(recipes[0]);

  console.log('Download Util  recipes = ', recipes);
  console.log('Keys = ', keys);

  csv = '';
  csv += keys.join(columnDelimiter);
  csv += lineDelimiter;

  recipes.forEach(function(note) {
    let ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) csv += columnDelimiter;
      let temp = recipes[key] ? recipes[key].toString() : '';
      temp = temp.replace(/[,\n]/g, '');
      csv += temp;

      ctr++;
    });
    csv += lineDelimiter;
  });

  if (csv == null) return;

  csv = 'data:text/csv;charset=utf-8,' + csv;

  link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
};
