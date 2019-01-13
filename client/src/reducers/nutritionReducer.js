import * as actionTypes from '../actions';

const initialState = {
  nutrition: null,
  error: null
};

export const nutritionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NUTRITION:
      return { ...state, nutrition: action.payload };
    case actionTypes.REMOVE_NUTRITION:
      return { ...state, nutrition: action.payload };
    default:
      return state;
  }
};
