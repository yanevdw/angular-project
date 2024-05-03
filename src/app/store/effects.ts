import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getLogin,
  getLoginComplete,
  getRegister,
  getRegisterComplete,
} from './actions';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, map, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  getlogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLogin.type),
      switchMap((action: { email: string; password: string }) =>
        this.authService.login(action.email, action.password).pipe(
          map(({ name, id }) => getLoginComplete({ name, id })),
          catchError((error) => {
            console.error(
              'An unexpected error occurred while trying to log you in: ',
              error,
            );
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  getRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRegister.type),
      switchMap((action: { name: string; email: string; password: string }) =>
        this.authService
          .register(action.name, action.email, action.password)
          .pipe(
            map(({ name, id }) => getRegisterComplete({ name, id })),
            catchError((error) => {
              console.error(
                'An unexpected error occurred while trying to register you: ',
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
  ) {}
}
