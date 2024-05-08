import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Store } from '@ngrx/store';
import { CurrentBookshelfState } from '../../store/reducer';
import { selectedBookshelf } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { Book } from '../../models/states';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit, OnDestroy {
  bookStore = inject(Store<CurrentBookshelfState>);
  currentBooks$ = this.bookStore.select(selectedBookshelf);
  bookshelfSubscription: Subscription | undefined = undefined;

  ngOnInit() {
    this.bookshelfSubscription = this.currentBooks$.subscribe();
  }

  calculateTotalBooks(
    currentBooks: Book[],
    read: Book[],
    tbr: Book[],
    dnf: Book[],
  ): number {
    return currentBooks.length + read.length + tbr.length + dnf.length;
  }

  calculateTotalPagesRead(
    currentBooks: Book[],
    readBooks: Book[],
    dnfBooks: Book[],
  ) {
    let totalPages = 0;

    for (const book of readBooks) {
      totalPages += Number(book.pages);
    }

    for (const book of dnfBooks) {
      totalPages += Number(book.pages);
    }

    for (const book of currentBooks) {
      totalPages += Number(book.pages_read);
    }

    return totalPages;
  }

  calculateFavouritePace(
    currentBooks: Book[],
    readBooks: Book[],
    tbrBooks: Book[],
    dnfBooks: Book[],
  ) {
    let books = this.combineBooks(currentBooks, readBooks, tbrBooks, dnfBooks);

    let count = 0;
    let favouritePace = '';

    for (const book of books) {
      if (book.pace != '') {
        let paceFrequency = 0;

        for (const storedBook of books) {
          if (book.pace === storedBook.pace) {
            paceFrequency++;
          }
        }

        if (paceFrequency >= count) {
          count = paceFrequency;
          favouritePace = book.pace;
        }
      }
    }

    return favouritePace;
  }

  calculateFavouriteCategory(
    currentBooks: Book[],
    readBooks: Book[],
    tbrBooks: Book[],
    dnfBooks: Book[],
  ) {
    let count = 0;
    let favouriteCategory = '';
    let books = this.combineBooks(currentBooks, readBooks, tbrBooks, dnfBooks);

    for (const book of books) {
      if (book.category != '') {
        let catFrequency = 0;

        for (const storedBook of books) {
          if (book.category === storedBook.category) {
            catFrequency++;
          }
        }

        if (catFrequency >= count) {
          count = catFrequency;
          favouriteCategory = book.category;
        }
      }
    }

    return favouriteCategory;
  }

  // Reserved for future use

  // calculateFavouriteMood() {
  //   let count = 0;
  //   let favouriteMood = '';
  //
  //   for (const book of this.currentBooks) {
  //     if (book.category != '') {
  //       let catFrequency = 0;
  //
  //       for (const storedBook of this.currentBooks) {
  //         if (book.category[0] === storedBook.category[0]) {
  //           catFrequency++;
  //         }
  //       }
  //
  //       if (catFrequency >= count) {
  //         count = catFrequency;
  //         favouriteMood = book.category[0];
  //       }
  //     }
  //   }
  //
  //   return favouriteMood;
  // }

  calculateAverageRating(
    currentBooks: Book[],
    readBooks: Book[],
    tbrBooks: Book[],
    dnfBooks: Book[],
  ) {
    let count = 0;
    let totalRating = 0;
    let books = this.combineBooks(currentBooks, readBooks, tbrBooks, dnfBooks);

    for (const book of books) {
      count++;
      totalRating += book.rating;
    }

    return (totalRating / count).toFixed(2);
  }

  combineBooks(
    currentBooks: Book[],
    readBooks: Book[],
    tbrBooks: Book[],
    dnfBooks: Book[],
  ) {
    let books: Book[] = [];
    for (const book of readBooks) {
      books.push(book);
    }
    for (const book of currentBooks) {
      books.push(book);
    }
    for (const book of tbrBooks) {
      books.push(book);
    }
    for (const book of dnfBooks) {
      books.push(book);
    }
    return books;
  }

  ngOnDestroy(): void {
    this.bookshelfSubscription?.unsubscribe();
  }
}
