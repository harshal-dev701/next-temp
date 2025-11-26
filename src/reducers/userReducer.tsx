import { combineReducers } from 'redux';
import { PayloadAction, createReducer as createReducerOrig } from '@reduxjs/toolkit';
import * as Actions from '../actions/types';
import { createReducer } from '@/helper/reduxHelpers';


// const initialResetPasswordState = {
//     password: '',
//     confirmPassword: ''
//   };
  
//   const resetPasswordReducer = createReducerOrig(initialResetPasswordState, (builder) => {
//     builder
//       .addCase(
//         Actions.SET_RESET_PASSWORD_DETAILS,
//         (state = initialResetPasswordState, action: PayloadAction<any, any>) => {
//           return { ...(action.payload || {}) };
//         }
//       )
//       .addCase(Actions.UPDATE_RESET_PASSWORD_DETAILS, (state, action: PayloadAction<any, any>) => {
//         const info: any = { ...state };
//         info[action.payload.propsName] = action.payload.value;
//         return { ...info };
//       })
//       .addCase(Actions.CLEAR_RESET_PASSWORD_DETAILS, () => {
//         const initialInfoState = JSON.parse(JSON.stringify(initialResetPasswordState));
//         return initialInfoState;
//       });
//   });
  
  const allUsersListReducer = createReducer({
    initialState: [],
    actionType: Actions.SET_ALL_USERS_LIST
  });
  
  const userReducer = combineReducers({
    allUsersList: allUsersListReducer
  });
  
  export default userReducer;