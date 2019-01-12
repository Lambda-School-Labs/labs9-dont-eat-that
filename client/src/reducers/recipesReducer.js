import * as actionTypes from '../actions';

const initialState = {
  fetching: false,
  recipes: [],
  error: null
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_RECIPES:
      return { ...state, gettingRecipes: true };
    case actionTypes.GETTING_RECIPE:
      return { ...state, gettingRecipe: true };
    case actionTypes.GET_RECIPES:
      return { ...state, recipes: action.payload, gettingRecipes: false };
    case actionTypes.GET_RECIPE:
      return { ...state, recipe: action.payload, gettingRecipe: false };
    case actionTypes.ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case actionTypes.DELETE_RECIPE:
      return { ...state, recipes: action.payload };
    case actionTypes.ERROR:
      return {
        ...state,
        gettingRecipes: false,
        error: action.payload
      };
    default:
      return state;
  }
};
