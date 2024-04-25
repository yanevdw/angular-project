import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  private currentUser: User | undefined;

  private isLoggedIn = false;

  get isLoggedInState() {
    return this.isLoggedIn;
  }

  setIsLoggedIn(newLoggedInState: boolean) {
    this.isLoggedIn = newLoggedInState;
  }

  get getCurrentUser() {
    return this.currentUser;
  }

  login = async (email: string, password: string) => {
    signInWithEmailAndPassword(this.firebaseAuth, email.trim(), password.trim())
      .then((result) => {
        this.currentUser = result.user;
        this.setIsLoggedIn(true);
        this.router.navigate(['home']);
      })
      .catch((error) => console.error(error));
  };

  register = async (name: string, email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    await updateProfile(user, { displayName: name });
    this.currentUser = user;
    this.setIsLoggedIn(true);
    this.router.navigate(['home']);
  };
}
