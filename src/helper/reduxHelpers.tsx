import { createReducer as createReducerOrig } from '@reduxjs/toolkit';

export const createReducer = (payload:any) => {
  const { initialState, actionType } = payload
  return createReducerOrig(initialState, (builder: any) => {
    builder.addCase(actionType, (_state: any, action: any) => action.payload);
  });
};
