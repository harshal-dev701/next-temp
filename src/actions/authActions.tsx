import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import * as Actions from './types';

/**
 * @desc Set Auth Loader
 */
export const setAuthLoader: ActionCreatorWithPayload<boolean, string> = createAction(Actions.SET_AUTH_LOADER);

/**
 * @desc set auth details
 */
export const setAuthDetails: ActionCreatorWithPayload<any, string> = createAction(Actions.SET_AUTH_DETAILS);

/**
 * @desc Update auth details
 */
export const updateAuthDetails: ActionCreatorWithPayload<any, string> = createAction(Actions.UPDATE_AUTH_DETAILS);

/**
 * @desc clear auth details
 */
export const clearAuthDetails: ActionCreatorWithOptionalPayload<any, string> = createAction(Actions.CLEAR_AUTH_DETAILS);

/**
 * @desc set auth error
 */
export const setAuthError: ActionCreatorWithPayload<any, string> = createAction(Actions.SET_AUTH_ERROR);

/**
 * @desc Update auth error
 */
export const updateAuthError: ActionCreatorWithPayload<any, string> = createAction(Actions.UPDATE_AUTH_ERROR);

/**
 * @desc clear auth error
 */
export const clearAuthError: ActionCreatorWithOptionalPayload<any, string> = createAction(Actions.CLEAR_AUTH_ERROR);

/**
 * @desc set login details
 */
export const setLoginDetails: ActionCreatorWithPayload<any, string> = createAction(Actions.SET_LOGIN_DETAILS);

/**
 * @desc Update login details
 */
export const updateLoginDetails: ActionCreatorWithPayload<any, string> = createAction(Actions.UPDATE_LOGIN_DETAILS);

/**
 * @desc clear login details
 */
export const clearLoginDetails: ActionCreatorWithOptionalPayload<any, string> = createAction(
  Actions.CLEAR_LOGIN_DETAILS
);

/**
 * @desc set Reset password details
 */
export const setResetPasswordDetails: ActionCreatorWithPayload<any, string> = createAction(
  Actions.SET_RESET_PASSWORD_DETAILS
);

/**
 * @desc Update Reset password details
 */
export const updateResetPasswordDetails: ActionCreatorWithPayload<any, string> = createAction(
  Actions.UPDATE_RESET_PASSWORD_DETAILS
);

/**
 * @desc clear Reset password details
 */
export const clearResetPasswordDetails: ActionCreatorWithOptionalPayload<any, string> = createAction(
  Actions.CLEAR_RESET_PASSWORD_DETAILS
);

/**
 * @desc set Subscriptions List
 */
export const setSubscriptionsList: ActionCreatorWithPayload<any, string> = createAction(Actions.SET_SUBSCRIPTIONS_LIST);

/**
 * @desc Clear Auth details
 */
export const clearAuthData = () => (dispatch: Dispatch) => {
  dispatch(setAuthLoader(false));
  dispatch(clearAuthDetails());
  dispatch(clearAuthError());
  dispatch(clearLoginDetails());
  dispatch(setSubscriptionsList([]));
};
