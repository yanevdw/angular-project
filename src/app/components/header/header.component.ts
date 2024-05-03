import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { CurrentUserState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectedUser } from '../../store/selectors';
import { getLogout } from '../../store/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, AsyncPipe],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);

  router = inject(Router);
  store = inject(Store<CurrentUserState>);
  currentUserName: string | undefined = undefined;
  loggedInUserInfo = this.store.select(selectedUser);

  constructor() {
    // Have to do this because the displayName is not persisting.
    this.currentUserName = this.authService.getCurrentUserName();
  }

  handleLogOutClick() {
    this.store.dispatch(getLogout());
  }
}
