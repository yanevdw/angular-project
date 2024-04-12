import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  get isLoggedInState() {
    return this.isLoggedIn;
  }

  setIsLoggedIn(newLoggedInState: boolean) {
    this.isLoggedIn = newLoggedInState;
  }
}
