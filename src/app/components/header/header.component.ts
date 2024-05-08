import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
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
  loggedInUserInfo$ = this.authService.currentUser$;

  userSubscription: Subscription | undefined = undefined;

  constructor() {
    // Have to do this because the displayName is not persisting.
    this.userSubscription = this.loggedInUserInfo$.subscribe();
  }

  handleLogOutClick() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
