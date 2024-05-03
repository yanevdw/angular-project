import { createAction, props } from '@ngrx/store';
import { Book, BookShelf } from '../models/states';

// Actions for login
export const getLogin = createAction(
  '[USER] Get Login',
  props<{ email: string; password: string }>(),
);

export const getLoginComplete = createAction(
  '[USER] Get LoginComplete',
  props<{
    name: string;
    id: string;
  }>(),
);

// Actions for register
export const getRegister = createAction(
  '[USER] Get Register',
  props<{
    name: string;
    email: string;
    password: string;
  }>(),
);
export const getRegisterComplete = createAction(
  '[USER] Get RegisterComplete',
  props<{
    name: string;
    id: string;
  }>(),
);

// Actions for logout
export const getLogout = createAction('[USER] Get Logout');
export const getLogoutComplete = createAction('[USER] Get LogoutComplete');

// Actions for bookshelf
export const getBookshelf = createAction(
  '[BOOKSHELF] Get Bookshelf',
  props<{ userId: string }>(),
);
export const getBookshelfComplete = createAction(
  '[BOOKSHELF] Get BookshelfComplete',
  props<{ bookshelf: BookShelf }>(),
);

// Actions for API calls
export const getBooks = createAction('[BOOKS] Get Books');

export const getBooksComplete = createAction(
  '[BOOKS] GetBooksComplete',
  props<{ books: Book[] }>(),
);
