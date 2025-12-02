import { combineReducers } from 'redux';
import { PayloadAction, createReducer as createReducerOrig } from '@reduxjs/toolkit';
import * as Actions from '../actions/types';
import { createReducer } from '@/helper/reduxHelpers';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER
});

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: ''
};

const authDetailsReducer = createReducerOrig(initialState, (builder) => {
  builder
  //update upcoming values to replace initial state
  //action.payload = set data in action
    // --> Replaces the whole form with new data

    .addCase(Actions.SET_AUTH_DETAILS, (state = initialState, action: PayloadAction<any, any>) => {
      return { ...(action.payload || {}) };
    })
    //update upcoming one by one values to replace existing state
    //called action to update data
    // dispatch({
    //   type: UPDATE_AUTH_DETAILS,
    //   payload: { propsName: "email", value: "new@mail.com" }
    // })
    // ➡️ Only email gets updated.
    // --> Updates only one field — dynamic update
    .addCase(Actions.UPDATE_AUTH_DETAILS, (state, action: PayloadAction<any, any>) => {
      const info: any = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    //Reset state to default
    // Why JSON.parse(JSON.stringify())?
    // to avoid returning the same object reference
    // --> Clear the form back to default empty values
    .addCase(Actions.CLEAR_AUTH_DETAILS, () => {
      const initialInfoState = JSON.parse(JSON.stringify(initialState));
      return initialInfoState;
    });
});

const errorMessageInitialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  checked: '',
  firebaseError: '',
  forgotPassword: '',
  resetPassword: ''
};

const errorMessageReducer = createReducerOrig(errorMessageInitialState, (builder) => {
  builder
    .addCase(Actions.SET_AUTH_ERROR, (state = errorMessageInitialState, action: PayloadAction<any, any>) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_AUTH_ERROR, (state = errorMessageInitialState, action: PayloadAction<any, any>) => {
      let errorObj = JSON.parse(JSON.stringify(state));
      errorObj[action.payload.propsName] = action.payload.message;
      return { ...errorObj };
    })
    .addCase(Actions.CLEAR_AUTH_ERROR, () => {
      const initialErrorState = JSON.parse(JSON.stringify(errorMessageInitialState));
      return initialErrorState;
    });
});

const initialLoginState = {
  email: '',
  password: ''
};

const loginDetailsReducer = createReducerOrig(initialLoginState, (builder) => {
  builder
    .addCase(Actions.SET_LOGIN_DETAILS, (state = initialLoginState, action: PayloadAction<any, any>) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_LOGIN_DETAILS, (state, action: PayloadAction<any, any>) => {
      const info: any = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_LOGIN_DETAILS, () => {
      const initialInfoState = JSON.parse(JSON.stringify(initialLoginState));
      return initialInfoState;
    });
});

const initialResetPasswordState = {
  password: '',
  confirmPassword: ''
};

const resetPasswordReducer = createReducerOrig(initialResetPasswordState, (builder) => {
  builder
    .addCase(
      Actions.SET_RESET_PASSWORD_DETAILS,
      (state = initialResetPasswordState, action: PayloadAction<any, any>) => {
        return { ...(action.payload || {}) };
      }
    )
    .addCase(Actions.UPDATE_RESET_PASSWORD_DETAILS, (state, action: PayloadAction<any, any>) => {
      const info: any = { ...state };
      info[action.payload.propsName] = action.payload.value;
      return { ...info };
    })
    .addCase(Actions.CLEAR_RESET_PASSWORD_DETAILS, () => {
      const initialInfoState = JSON.parse(JSON.stringify(initialResetPasswordState));
      return initialInfoState;
    });
});

const subscriptionsListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_SUBSCRIPTIONS_LIST
});

const authReducer = combineReducers({
  loading: loadingReducer,
  authDetails: authDetailsReducer,
  validationErrorMessage: errorMessageReducer,
  loginDetails: loginDetailsReducer,
  resetPassword: resetPasswordReducer,
  subscriptionsList: subscriptionsListReducer
});

export default authReducer;
