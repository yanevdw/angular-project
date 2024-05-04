import { CollectionDisplayComponent } from './components/collection-display/collection-display.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionDisplayComponent, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {
  bookshelfId: number | undefined = undefined;
  dataService = inject(DataService);
  authService = inject(AuthService);
  loggedInUserId: string | undefined = undefined;
  books: string[] = [];

  constructor() {
    this.authService.isUserSet$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.loggedInUserId = this.authService.currentUserSignal()?.id;

        const bookshelfResult$ = this.dataService.getBookshelf(
          this.loggedInUserId ?? '',
        );

        let bookshelfSubscription = bookshelfResult$.subscribe((bookshelf) => {
          if (bookshelf) {
            this.bookshelfId = bookshelf?.[0]?.id;

            const booksResult$ = this.dataService.getBooks(this.bookshelfId);
            booksResult$.subscribe((booksResult) => {
              localStorage.setItem('books', JSON.stringify(booksResult));
            });
          }
        });

        if (localStorage.getItem('books')) {
          this.books = JSON.parse(localStorage.getItem('books') as string);
        }

        // Unsubscribe after the id has been fetched.
        if (bookshelfSubscription && this.bookshelfId) {
          bookshelfSubscription.unsubscribe();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.isUserSet$.unsubscribe();
  }
}
