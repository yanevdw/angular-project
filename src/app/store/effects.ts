import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getBooks,
  getBooksComplete,
  getBookshelf,
  getBookshelfComplete,
} from './actions';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, map, retry, switchMap } from 'rxjs';
import { DataService } from '../services/data.service';

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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private dataService: DataService,
  ) {}
}
