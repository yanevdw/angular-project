import { createAction, props } from '@ngrx/store';
import { Bookshelf } from '../models/states';

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

//Actions for API calls
// export const getBooks = createAction('[BOOKS] Get Books');
//
// export const getBooksComplete = createAction(
//   '[BOOKS] GetBooksComplete',
//   props<{ books: Book[] }>(),
// );
//--------------------------------------------------------------------------------------------------------
