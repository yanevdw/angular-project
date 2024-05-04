import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Book } from '../../models/states';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  currentBooks = JSON.parse(localStorage.getItem('books') as string);
  currentlyReading = this.currentBooks.filter(
    (book: Book) => book.bookshelf_category === 'currently reading',
  );
  tbr = this.currentBooks.filter(
    (book: Book) => book.bookshelf_category === 'tbr',
  );
  dnf = this.currentBooks.filter(
    (book: Book) => book.bookshelf_category === 'dnf',
  );
  read = this.currentBooks.filter(
    (book: Book) => book.bookshelf_category === 'read',
  );

  calculateTotalPagesRead() {
    let totalPages = 0;

    for (const book of this.read) {
      totalPages += Number(book.pages);
    }

    for (const book of this.currentlyReading) {
      totalPages += Number(book.pages_read);
    }

    return totalPages;
  }

  calculateFavouritePace() {
    let count = 0;
    let favouritePace = '';

    for (const book of this.currentBooks) {
      if (book.pace != '') {
        let paceFrequency = 0;

        for (const storedBook of this.currentBooks) {
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

  calculateFavouriteCategory() {
    let count = 0;
    let favouriteCategory = '';

    for (const book of this.currentBooks) {
      if (book.category != '') {
        let catFrequency = 0;

        for (const storedBook of this.currentBooks) {
          if (book.category[0] === storedBook.category[0]) {
            catFrequency++;
          }
        }

        if (catFrequency >= count) {
          count = catFrequency;
          favouriteCategory = book.category[0];
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

  calculateAverageRating() {
    let count = 0;
    let totalRating = 0;

    for (const book of this.currentBooks) {
      count++;
      totalRating += book.rating;
    }

    return totalRating / count;
  }
}
