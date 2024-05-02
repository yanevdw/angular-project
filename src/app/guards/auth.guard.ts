import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // if (authService.currentUserSignal()) {
  //   authService.isUserSet$.next(true);
  //   return router.parseUrl('login');
  // } else {
  //   authService.isUserSet$.next(true);
  //   return true;
  // }
  // // return true;

  authService.currentUser$.pipe(take(1)).subscribe((user) => {
    if (user) {
      authService.currentUserSignal.set({
        //! is added because it is pretty much guaranteed that the user is logged in at this point
        email: user.email!,
        name: user.displayName!,
        id: user.uid!,
      });
    } else {
      authService.currentUserSignal.set(null);
    }

    if (!user) {
      router.navigate(['/login']);
      return false;
    } else {
      // router.navigate(['/']);
      authService.isUserSet$.next(true);
      return true;
    }
  });

  return true;
};
