import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.currentUser$.pipe(take(1)).subscribe((user) => {
    if (user) {
      authService.currentUserSignal.set({
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
      authService.isUserSet$.next(true);
      return true;
    }
  });

  return true;
};
