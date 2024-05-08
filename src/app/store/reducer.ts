import { createReducer, on } from '@ngrx/store';
import { getBooksComplete, getBookshelfComplete } from './actions';
import { Bookshelf } from '../models/states';

export interface CurrentBookshelfState {
  bookshelfId: string;
  books: Bookshelf;
}

export const bookshelfFeatureKey = 'bookshelf';
const initialBookshelfState: CurrentBookshelfState = {
  bookshelfId: '',
  books: {} as Bookshelf,
};

export const bookshelfReducer = createReducer(
  initialBookshelfState,
  on(getBookshelfComplete, (state, { bookshelfId }) => {
    return { ...state, bookshelfId };
  }),
  on(getBooksComplete, (state, { books }) => {
    return { ...state, books };
  }),
);
