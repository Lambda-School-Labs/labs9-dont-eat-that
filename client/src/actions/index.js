import axios from 'axios';

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const ERROR = 'ERROR';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_RECIPES = 'GET_RECIPES';
export const GETTING_RECIPE = 'GETTING_RECIPE';
export const GETTING_RECIPES = 'GETTING_RECIPES';
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
    .then(res => dispatch({ type: ADD_RECIPE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const editRecipe = (id, recipe) => dispatch => {
  axios
    .put(`${URL}/api/recipes/edit/${id}`, recipe)
    .then(res => dispatch({ type: EDIT_RECIPE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const deleteRecipe = id => dispatch => {
  axios
    .delete(`${URL}/api/recipes/delete/${id}`)
    .then(res => dispatch({ type: DELETE_RECIPE, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};
