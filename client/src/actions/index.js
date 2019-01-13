import axios from 'axios';

export const ADD_ALLERGY = 'ADD_ALLERGY';
export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_USER = 'ADD_USER';
export const CANCEL_SUB = 'CANCEL_SUB';
export const CHARGE_USER = 'CHARGE_USER';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const ERROR = 'ERROR';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_UALLERGIES = 'GET_UALLERGIES';
export const GETTING_RECIPE = 'GETTING_RECIPE';
export const GETTING_RECIPES = 'GETTING_RECIPES';
export const GET_USER = 'GET_USER';
export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';
export const RECIPE_FAILURE = 'RECIPE_FAILURE';

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

export const editRecipe = (id, recipe) => dispatch => {
  axios
    .put(`${URL}/api/recipes/edit/${id}`, recipe)
    .then(res => dispatch({ type: EDIT_RECIPE, payload: res.data }))
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

export const getUser = () => dispatch => {
  let firebaseid = localStorage.getItem('uid');
  axios
    .get(`${URL}/api/users/one/${firebaseid}`)
    .then(res => dispatch({ type: GET_USER, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const addUser = firebaseid => dispatch => {
  axios
    .post(`${URL}/api/users/create`, { firebaseid })
    .then(res =>
      dispatch({ type: ADD_USER, payload: { id: res.data, firebaseid } })
    )
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const chargeUser = (token, plan) => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .post(`${URL}/api/payments/charge`, {
      token: token.id,
      customerPlan: plan,
      firebaseid
    })
    .then(res => dispatch({ type: CHARGE_USER, payload: true }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const cancelSubscription = () => dispatch => {
  const firebaseid = localStorage.getItem('uid');
  axios
    .post(`${URL}/api/payments/cancel`, { firebaseid })
    .then(res => dispatch({ type: CANCEL_SUB, payload: true }))
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
