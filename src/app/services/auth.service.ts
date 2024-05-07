import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { from, map, Observable, Subject } from 'rxjs';
import { UserInfo } from '../models/states';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  dataService = inject(DataService);
  currentUser$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInfo | undefined | null>(undefined);
  isUserSet$ = new Subject<boolean>();

  login(
    email: string,
    password: string,
  ): Observable<{ name: string; id: string }> {
    return from(
      signInWithEmailAndPassword(
        this.firebaseAuth,
        email.trim(),
        password.trim(),
      ),
    ).pipe(
      map((user) => {
        if (user.user.displayName) {
          this.router.navigate(['home']);
          return { name: user.user.displayName!, id: user.user.uid };
        } else {
          this.router.navigate(['home']);
          return { name: '', id: user.user.uid };
        }
      }),
    );
  }

  register(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          updateProfile(response.user, { displayName: name });
          this.dataService.createBookshelf(response.user.uid);
          this.router.navigate(['home']);
          return {
            name: response.user.displayName ?? '',
            id: response.user.uid,
          };
        },
      ),
    );
  }

  logout() {
    return from(
      signOut(this.firebaseAuth).then(() => {
        this.router.navigate(['/login']);
      }),
    );
  }
}
