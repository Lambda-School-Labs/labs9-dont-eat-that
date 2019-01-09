import * as actionTypes from "../actions";


const initialState = {
  fetching: false,
  recipes: [],
  error: null
};

export const RecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_RECIPES:
      return { ...state, gettingRecipes: true };
    case actionTypes.GET_RECIPES:
      return { ...state, recipes: action.payload, gettingRecipes: false };

    case actionTypes.ERROR:
      return {
        ...state,
        gettingRecipes: false,
        creatingRecipes: false
      };
    default:
      return state;
  }
};
