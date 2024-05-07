import { CollectionDisplayComponent } from './components/collection-display/collection-display.component';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CurrentBookshelfState } from '../../store/reducer';
import { selectedBookshelf } from '../../store/selectors';
import { getBooks, getBookshelf } from '../../store/actions';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionDisplayComponent, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit, OnDestroy {
  bookshelfId: number | undefined = undefined;
  dataService = inject(DataService);
  authService = inject(AuthService);
  loggedInUserId: string | undefined = undefined;
  store = inject(Store<CurrentBookshelfState>);
  bookshelf$ = this.store.select(selectedBookshelf);

  ngOnInit() {
    this.authService.isUserSet$.pipe(take(1)).subscribe((user) => {
      if (user) {
        const userId = this.authService.currentUserSignal()?.id;
        if (userId) {
          this.store.dispatch(getBookshelf({ userId: userId }));
        }
      }
    });

    this.bookshelf$.pipe(take(2)).subscribe((bookshelf) => {
      if (bookshelf && bookshelf.bookshelfId !== '') {
        this.store.dispatch(getBooks({ bookshelfId: bookshelf.bookshelfId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.isUserSet$.unsubscribe();
  }
}
