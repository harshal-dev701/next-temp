import { combineReducers } from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: userReducer
});

export default rootReducer;
