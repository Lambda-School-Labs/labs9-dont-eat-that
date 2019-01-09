import axios from 'axios';

export const ERROR = 'ERROR';
export const GET_RECIPES = 'GET_RECIPES';
export const GETTING_RECIPES = 'GETTING_RECIPES';

const URL = "https://donteatthat.herokuapp.com/"


// all recipes
export const getRecipes = () => {
  const recipes = axios.get(`${URL}api/recipes/all`);
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


// single recipe
export const getRecipes = () => {
    const recipes = axios.get(`${URL}api/recipes/all`);
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