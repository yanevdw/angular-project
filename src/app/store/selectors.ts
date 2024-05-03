import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentUserState, userFeatureKey } from './reducer';

export const selectFeature =
  createFeatureSelector<CurrentUserState>(userFeatureKey);

export const selectedUser = createSelector(selectFeature, (state) => ({
  name: state.name,
  id: state.id,
}));
