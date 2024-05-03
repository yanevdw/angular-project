import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../models/states';
import { getLoginComplete, getRegisterComplete } from './actions';

export interface CurrentUserState {
  currentUser: UserInfo | undefined;
}

export const userFeatureKey = 'user';
const initialUserState: CurrentUserState = {
  currentUser: undefined,
};

export const userReducer = createReducer(
  initialUserState,
  on(getLoginComplete, (state, { currentUser }) => {
    return { ...state, currentUser };
  }),
  on(getRegisterComplete, (state, { currentUser }) => {
    return { ...state, currentUser };
  }),
);
