import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';

import { AuthService } from './services/auth.service';
import { Book, BookShelf } from './models/states';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  authService = inject(AuthService);
  firestore = inject(Firestore);

  // Get the bookshelf associated with the user, using the current (logged in) user's uid.
  getBookshelf() {
    const bookshelfQuery = query(
      collection(this.firestore, 'bookshelf'),
      where('userId', '==', this.authService.getCurrentUser?.uid),
    );
    return collectionData(bookshelfQuery, { idField: 'id' }) as Observable<
      BookShelf[]
    >;
  }

  // Get the books in a users bookshelf
  getBooks(bookshelfId: number) {
    const booksQuery = query(
      collection(this.firestore, 'book'),
      where('bookshelfId', '==', bookshelfId.toString()),
    );
    return collectionData(booksQuery) as Observable<Book[]>;
  }
}
