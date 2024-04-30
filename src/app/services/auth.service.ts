import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { deleteCookie, setCookie } from '../utils/utils';
import { DataService } from './data.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  dataService = inject(DataService);
  private currentUser: User | undefined;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  get getCurrentUser() {
    return this.currentUser;
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(
        this.firebaseAuth,
        email.trim(),
        password.trim(),
      )
        .then((signedInUser) => {
          this.currentUser = signedInUser.user;
          setCookie('currentUserId', this.currentUser.uid);
          setCookie('username', this.currentUser?.displayName!);
          this.router.navigate(['home']);
        })
        .catch((error) => console.error(error)),
    );
  }

  register(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (response) => {
          updateProfile(response.user, { displayName: name });
          this.currentUser = response.user;
          setCookie('currentUserId', this.currentUser.uid);
          setCookie('username', this.currentUser?.displayName!);
          this.dataService.createBookshelf();
          this.router.navigate(['home']);
        },
      ),
    );
  }

  logout() {
    return from(
      signOut(this.firebaseAuth).then(() => {
        deleteCookie('currentUserId');
        deleteCookie('username');
        this.router.navigate(['login']);
      }),
    );
  }
}
