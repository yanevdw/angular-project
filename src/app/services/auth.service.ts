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
import { from, Subject } from 'rxjs';
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

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(
        this.firebaseAuth,
        email.trim(),
        password.trim(),
      )
        .then(() => {})
        .catch((error) => console.error(error)),
    );
  }

  register(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          updateProfile(response.user, { displayName: name });
          this.dataService.createBookshelf(response.user.uid);
          this.router.navigate(['home']);
        },
      ),
    );
  }

  logout() {
    return from(signOut(this.firebaseAuth).then(() => {}));
  }
}
