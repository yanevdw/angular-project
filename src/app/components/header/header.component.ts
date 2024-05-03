import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  loggedInUser: string | null | undefined = null;
  logOutSubscription: Subscription | undefined;
  currentUserSubscription: Subscription | undefined;
  router = inject(Router);

  ngOnInit() {
    this.authService.isUserSet$.subscribe((user) => {
      if (user) {
        this.loggedInUser = this.authService.currentUserSignal()?.name;
      }
    });
  }

  handleLogOutClick() {
    this.logOutSubscription = this.authService
      .logout()
      .subscribe({ next: () => this.router.navigate(['/login']) });
  }

  ngOnDestroy(): void {
    this.logOutSubscription?.unsubscribe();
  }
}
