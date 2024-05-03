import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentUserState, userFeatureKey } from './reducer';

export const selectFeature =
  createFeatureSelector<CurrentUserState>(userFeatureKey);

export const selectLogin = createSelector(
  selectFeature,
  (state) => state.currentUser,
);

export const selectRegister = createSelector(
  selectFeature,
  (state) => state.currentUser,
);
