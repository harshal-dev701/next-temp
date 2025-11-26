import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc set all users list
 */
export const setAllUsersList: ActionCreatorWithPayload<any[], string> = createAction(Actions.SET_ALL_USERS_LIST);
