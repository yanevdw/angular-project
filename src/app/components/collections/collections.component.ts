import { CollectionDisplayComponent } from './components/collection-display/collection-display.component';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionDisplayComponent, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  bookshelfId: number | undefined;
  dataService = inject(DataService);
  authService = inject(AuthService);
  loggedInUserId: string | null | undefined = null;

  ngOnInit() {
    this.authService.isUserSet$.subscribe((user) => {
      if (user) {
        this.loggedInUserId = this.authService.currentUserSignal()?.id;
      }
    });

    const bookshelfResult$ = this.dataService.getBookshelf(
      this.loggedInUserId ?? '',
    );
    let bookshelfSubscription = bookshelfResult$.subscribe((bookshelf) => {
      this.bookshelfId = bookshelf?.[0]?.id;
    });
    // Unsubscribe after the id has been fetched.
    if (bookshelfSubscription && this.bookshelfId) {
      bookshelfSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.authService.isUserSet$.unsubscribe();
  }
}
