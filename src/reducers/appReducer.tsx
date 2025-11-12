import { combineReducers } from 'redux';
import * as Actions from '../actions/types';
import { createReducer } from '@/helper/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER
});

const authDetailsReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_AUTH_DETAILS
});


const loginDetailsReducer = createReducer({
  initialState: '',
  actionType: Actions.SET_LOGIN_DETAILS
});

const authErrorReducer = createReducer({
  initialState: {},
  actionType: Actions.SET_AUTH_ERROR
});

const appReducer = combineReducers({
  loading: loadingReducer,
  authDetails: authDetailsReducer,
  loginDetails: loginDetailsReducer,
  authError: authErrorReducer
});

export default appReducer;
