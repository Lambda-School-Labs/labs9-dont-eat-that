import { combineReducers } from 'redux';
import { recipesReducer } from './recipesReducer';
import { usersReducer } from './usersReducer';

export default combineReducers({
  recipesReducer,
  usersReducer
});
