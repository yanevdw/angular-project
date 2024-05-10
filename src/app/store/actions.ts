import { createAction, props } from '@ngrx/store';
import { Book, Bookshelf } from '../models/states';

// Actions for bookshelf
export const getBookshelf = createAction(
  '[BOOKSHELF] Get Bookshelf',
  props<{ userId: string }>(),
);
export const getBookshelfComplete = createAction(
  '[BOOKSHELF] Get BookshelfComplete',
  props<{ bookshelfId: string }>(),
);

//Actions for books
export const getBooks = createAction(
  '[BOOKSHELF] Get Books',
  props<{ bookshelfId: string }>(),
);
export const getBooksComplete = createAction(
  '[BOOKSHELF] Get BooksComplete',
  props<{ books: Bookshelf }>(),
);

export const addBook = createAction(
  '[BOOKSHELF] Add Book',
  props<{ book: Book; bookshelfId: string }>(),
);

export const addBookComplete = createAction('[BOOKSHELF] Add BookComplete');

export const updateBook = createAction(
  '[BOOKSHELF] Update Book',
  props<{ bookId: string; book: Book; bookshelfId: string }>(),
);

export const updateBookComplete = createAction(
  '[BOOKSHELF] Update BookComplete',
);

export const deleteBook = createAction(
  '[BOOKSHELF] Delete Book',
  props<{ bookIdIsbn: string }>(),
);

export const deleteBookComplete = createAction(
  '[BOOKSHELF] Delete BookComplete',
);
