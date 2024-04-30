import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { Subscription } from 'rxjs';
import { getCookie } from '../../utils/utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  authService = inject(AuthService);
  loggedInUser = getCookie('username');
  logOutSubscription: Subscription | undefined;

  handleLogOutClick() {
    this.logOutSubscription = this.authService.logout().subscribe();
  }

  ngOnDestroy(): void {
    this.logOutSubscription?.unsubscribe();
  }
}
