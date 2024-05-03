import { createReducer, on } from '@ngrx/store';
import { getLoginComplete, getRegisterComplete } from './actions';

export interface CurrentUserState {
  name: string;
  id: string;
}

export const userFeatureKey = 'user';
const initialUserState: CurrentUserState = {
  name: '',
  id: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(getLoginComplete, (state, { name, id }) => {
    return { ...state, name, id };
  }),
  on(getRegisterComplete, (state, { name, id }) => {
    return { ...state, name, id };
  }),
);
