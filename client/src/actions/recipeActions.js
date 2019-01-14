import axios from 'axios';

export const ADD_ALLERGY = 'ADD_ALLERGY';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const GET_NUTRITION = 'GET_NUTRITION';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_UALLERGIES = 'GET_UALLERGIES';
export const GETTING_RECIPE = 'GETTING_RECIPE';
export const GETTING_RECIPES = 'GETTING_RECIPES';
export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';
export const RECIPE_FAILURE = 'RECIPE_FAILURE';
export const REMOVE_NUTRITION = 'REMOVE_NUTRITION';
export const AUTOCOM_ING = 'AUTOCOM_ING';
export const RESET_AUTOCOM = 'RESET_AUTOCOM';
export const DELETE_ALLERGY = 'DELETE_ALLERGY';
export const ERROR = 'ERROR';

const URL = 'https://donteatthat.herokuapp.com';

// all recipes
export const getAllRecipes = () => dispatch => {
  dispatch({ type: GETTING_RECIPES });
  axios
    .get(`${URL}/api/recipes/all`)
    .then(res => dispatch({ type: GET_RECIPES, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

// single recipe
export const getRecipe = id => dispatch => {
  dispatch({ type: GETTING_RECIPE });
  axios
    .get(`${URL}/api/recipes/one/${id}`)
    .then(res => dispatch({ type: GET_RECIPE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const addRecipe = recipe => dispatch => {
  axios
    .post(`${URL}/api/recipes/create`, recipe)
    .then(res => dispatch({ type: ADD_RECIPE, payload: recipe }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const editRecipe = (id, recipe) => (dispatch, getState) => {
  const firebaseid = localStorage.getItem('uid');
  const { name, description, ingredients } = recipe;
  const recipes = getState().recipesReducer.recipes.map(oldRecipe => {
    return oldRecipe.id === id ? recipe : oldRecipe;
  });
  axios
    .put(`${URL}/api/recipes/edit/${id}`, {
      name,
      description,
      firebaseid,
      ingredients
    })
    .then(res => dispatch({ type: EDIT_RECIPE, payload: { recipe, recipes } }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const deleteRecipe = id => (dispatch, getState) => {
  // going through recipes and filtering out selected recipe to be in payload
  const filteredRecipes = getState().recipesReducer.recipes.filter(
    recipe => `${recipe.id}` !== id
  );
  axios
    .delete(`${URL}/api/recipes/delete/${id}`)
    .then(res => dispatch({ type: DELETE_RECIPE, payload: filteredRecipes }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const getAllergies = () => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .get(`${URL}/api/allergies/user/${firebaseid}`)
    .then(res => dispatch({ type: GET_UALLERGIES, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const addAllergy = allergy => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .post(`${URL}/api/allergies/create`, { firebaseid, allergy })
    .then(res => dispatch({ type: ADD_ALLERGY, payload: allergy }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const deleteAllergy = allergy => (dispatch, getState) => {
  const firebaseid = localStorage.getItem('uid');
  const allergyArr = getState().usersReducer.user.allergies.filter(oldAllergy => {
    return oldAllergy !== allergy;
  })
  axios
    .delete(`${URL}/api/allergies/delete/${allergy}`, {firebaseid, allergy})
    .then(res => dispatch({ type: DELETE_ALLERGY, payload: allergyArr }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
}

export const getNutrition = (title, ingr) => dispatch => {
  axios
    .post(
      'https://api.edamam.com/api/nutrition-details?app_id=cd055d66&app_key=e766d0318dfa0deb2000552f4e149af0',
      { title, ingr }
    )
    .then(res => dispatch({ type: GET_NUTRITION, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const removeNutrition = () => dispatch => {
  dispatch({ type: REMOVE_NUTRITION, payload: null });
};

export const autoComIng = query => async (dispatch, getState) => {
  try {
    const allergyQuery = await getState()
      .usersReducer.user.allergies.join('%2C+')
      .replace(/ /g, '+');
    const response = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=5&intolerances=${allergyQuery}&query=${query}`,
      {
        headers: {
          'X-RapidAPI-Key': 'gEsgyEGaQRmshWrmWzdHhRQUDBgqp1ZTHJtjsnFPTKZkph0cjy'
        }
      }
    );
    const queryArr = response.data.map(res => res.name);
    dispatch({ type: AUTOCOM_ING, payload: queryArr });
  } catch (err) {
    dispatch({ type: ERROR, payload: err });
  }
};

export const resetAutoCom = () => dispatch => {
  dispatch({ type: RESET_AUTOCOM, payload: null });
};
