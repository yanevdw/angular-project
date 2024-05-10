import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addBook,
  deleteBook,
  getBooks,
  getBooksComplete,
  getBookshelf,
  getBookshelfComplete,
  updateBook,
} from './actions';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, map, of, retry, switchMap } from 'rxjs';
import { DataService } from '../services/data.service';
import { Book } from '../models/states';

@Injectable()
export class UserEffects {
  getBookshelf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBookshelf.type),
      switchMap((action: { userId: string }) =>
        this.dataService.getBookshelf(action.userId).pipe(
          map((response) =>
            getBookshelfComplete({ bookshelfId: response[0].id.toString() }),
          ),
          catchError((error) => {
            console.error(
              'An unexpected error occurred while trying to get your bookshelf: ',
              error,
            );
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBooks.type),
      switchMap((action: { bookshelfId: string }) =>
        this.dataService.filterBooks(action.bookshelfId).pipe(
          map((response) => getBooksComplete({ books: response })),
          retry(1),
          catchError((error) => {
            console.error(
              'An unexpected error occurred while trying to get your bookshelf: ',
              error,
            );
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBook.type),
      switchMap((action: { book: Book; bookshelfId: string }) => {
        this.dataService.addBook(action.book, action.bookshelfId);

        return of(getBooks({ bookshelfId: action.bookshelfId }));
      }),
    ),
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook.type),
      switchMap(
        (action: { bookId: string; book: Book; bookshelfId: string }) => {
          this.dataService.updateBook(
            action.bookId,
            action.book,
            action.bookshelfId,
          );

          return of(getBooks({ bookshelfId: action.bookshelfId }));
        },
      ),
    ),
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBook.type),
      switchMap((action: { bookId: string; bookshelfId: string }) => {
        this.dataService.deleteBook(action.bookId);

        return of(getBooks({ bookshelfId: action.bookshelfId }));
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dataService: DataService,
  ) {}
}
