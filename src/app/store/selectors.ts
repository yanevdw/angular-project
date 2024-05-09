import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookshelfFeatureKey, CurrentBookshelfState } from './reducer';

export const selectBookshelfFeature =
  createFeatureSelector<CurrentBookshelfState>(bookshelfFeatureKey);

export const selectedBookshelf = createSelector(
  selectBookshelfFeature,
  (state) => ({
    bookshelfId: state.bookshelfId,
    bookshelf: state.books,
  }),
);
