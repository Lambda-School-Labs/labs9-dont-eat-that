import { combineReducers } from 'redux';
import { recipesReducer } from './recipesReducer';
import { usersReducer } from './usersReducer';
import { paymentReducer } from './paymentReducer';

export default combineReducers({
  recipesReducer,
  usersReducer,
  paymentReducer
});
