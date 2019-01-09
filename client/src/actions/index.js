import axios from 'axios';

export const ERROR = 'ERROR';
export const GET_RECIPES = 'GET_RECIPES';
export const GETTING_RECIPES = 'GETTING_RECIPES';

// const URL = "" this is backend

export const getRecipes = () => {
  const recipes = axios.get(URL);
  return dispatch => {
    dispatch({ type: GETTING_RECIPES });
    recipes
      .then(response => {
        dispatch({ type: GET_RECIPES, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};
