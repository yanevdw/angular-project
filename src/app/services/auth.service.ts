import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { deleteCookie, setCookie } from '../utils/utils';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  router = inject(Router);
  dataService = inject(DataService);
  private currentUser: User | undefined;
  private isLoggedIn = false;

  get getCurrentUser() {
    return this.currentUser;
  }

  get isLoggedInState() {
    return this.isLoggedIn;
  }

  setIsLoggedIn(newLoggedInState: boolean) {
    this.isLoggedIn = newLoggedInState;
  }

  login = async (email: string, password: string) => {
    signInWithEmailAndPassword(this.firebaseAuth, email.trim(), password.trim())
      .then((signedInUser) => {
        this.currentUser = signedInUser.user;
        setCookie(this.currentUser.uid);
        this.setIsLoggedIn(true);
        this.router.navigate(['home']);
      })
      .catch((error) => console.error(error));
  };

  register = async (name: string, email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );
    await updateProfile(user, { displayName: name });
    this.currentUser = user;
    setCookie(this.currentUser.uid);
    this.dataService.createBookshelf();
    this.setIsLoggedIn(true);
    this.router.navigate(['home']);
  };

  logout() {
    signOut(this.firebaseAuth).then(() => {
      deleteCookie();
      this.router.navigate(['login']);
    });
  }
}
