import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { CurrentUserState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { getLogout } from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, AsyncPipe],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<CurrentUserState>);
  loggedInUserInfo$ = this.authService.currentUser$;
  logoutSubscription: Subscription | undefined = undefined;
  userSubscription: Subscription | undefined = undefined;

  constructor() {
    // Have to do this because the displayName is not persisting.
    this.userSubscription = this.loggedInUserInfo$.subscribe();
  }

  handleLogOutClick() {
    this.store.dispatch(getLogout());
    this.logoutSubscription = this.loggedInUserInfo$.subscribe();
    console.log(this.logoutSubscription);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.logoutSubscription?.unsubscribe();
  }
}
