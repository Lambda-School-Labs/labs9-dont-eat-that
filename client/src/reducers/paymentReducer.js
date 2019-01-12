import * as actionTypes from '../actions';

const initialState = {
  paymentComplete: false,
  error: null
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHARGE_USER:
      return { ...state, paymentComplete: action.payload };
    case actionTypes.CANCEL_SUB:
      return { ...state, subscriptionCanceled: action.payload };
    case actionTypes.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
