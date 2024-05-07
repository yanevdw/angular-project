import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Book, Bookshelf, BookShelf } from '../models/states';
import { from, map, Observable } from 'rxjs';

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

  // Get the books in a user's bookshelf.
  getBooks(bookshelfId: string) {
    const booksQuery = query(
      collection(this.firestore, 'book'),
      where('bookshelfId', '==', bookshelfId.toString()),
    );
    return collectionData(booksQuery) as Observable<Book[]>;
  }

  filterBooks(bookshelfId: string) {
    return this.getBooks(bookshelfId).pipe(
      // switchMap((books: Book[]) => {
      map((books) => {
        if (books) {
          let bookshelf: Bookshelf = {} as Bookshelf;
          bookshelf.tbr = books.filter(
            (book: Book) => book.bookshelf_category === 'tbr',
          );
          bookshelf.dnf = books.filter(
            (book: Book) => book.bookshelf_category === 'dnf',
          );
          bookshelf.read = books.filter(
            (book: Book) => book.bookshelf_category === 'read',
          );
          bookshelf.currentlyReading = books.filter(
            (book: Book) => book.bookshelf_category === 'currently reading',
          );
          if (
            bookshelf.tbr ||
            bookshelf.dnf ||
            bookshelf.read ||
            bookshelf.currentlyReading
          ) {
            return bookshelf as Bookshelf;
          }
        }
        return {} as Bookshelf;
      }),
    );
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
