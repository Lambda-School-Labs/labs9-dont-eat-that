import * as actionTypes from '../actions';

const initialState = {
  users: [],
  error: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        users: [
          ...state.users,
          { id: action.payload.id, firebaseid: action.payload.firebaseid }
        ]
      };
    default:
      return state;
  }
};
