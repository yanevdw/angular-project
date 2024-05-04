import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Book, BookShelf } from '../models/states';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore = inject(Firestore);

  // Get the bookshelf associated with the user, using the current (logged in) user's uid.
  getBookshelf(userId: string) {
    const bookshelfQuery = query(
      collection(this.firestore, 'bookshelf'),
      where('userId', '==', userId),
    );
    return collectionData(bookshelfQuery, {
      idField: 'id',
    }) as Observable<BookShelf[]>;
  }

  // Get the books in a users bookshelf.
  getBooks(bookshelfId: number) {
    const booksQuery = query(
      collection(this.firestore, 'book'),
      where('bookshelfId', '==', bookshelfId.toString()),
    );
    return collectionData(booksQuery) as Observable<Book[]>;
  }

  // Create a bookshelf for a new user.
  createBookshelf(userId: string) {
    return from(
      addDoc(collection(this.firestore, 'bookshelf'), {
        userId: userId,
      }).then(() => {}),
    );
  }

  getBook(bookIsbn: string) {
    const bookQuery = query(
      collection(this.firestore, 'book'),
      where('isbn', '==', Number(bookIsbn)),
    );
    return collectionData(bookQuery) as Observable<Book[]>;
  }
}
