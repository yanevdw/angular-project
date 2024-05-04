import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../models/states';

@Component({
  selector: 'app-collection-display',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collection-display.component.html',
  styleUrl: './collection-display.component.scss',
})
export class CollectionDisplayComponent {
  @Input() category = '';

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
  currentCoverUrl = this.getCoverImage('currently reading');
  readCoverUrl = this.getCoverImage('read');
  dnfCoverUrl = this.getCoverImage('dnf');
  tbrCoverUrl = this.getCoverImage('tbr');

  currentMoods = this.getMoods('currently reading');
  readMoods = this.getMoods('read');
  dnfMoods = this.getMoods('dnf');

  currentCategories = this.getCategories('currently reading');
  readCategories = this.getCategories('read');
  dnfCategories = this.getCategories('dnf');
  tbrCategories = this.getCategories('tbr');

  constructor() {}

  getAuthorCount(category: string): number {
    let authorArray;
    if (category === 'tbr') {
      let convertedBooks = this.tbr.map((book: Book) => book);
      let authorArray: string[] = [];
      for (const book of convertedBooks) {
        if (authorArray.indexOf(book.author) === -1) {
          authorArray.push(book.author);
        }
      }
      return authorArray.length;
    } else if (category === 'dnf') {
      let convertedBooks = this.dnf.map((book: Book) => book);
      let authorArray: string[] = [];
      for (const book of convertedBooks) {
        if (authorArray.indexOf(book.author) === -1) {
          authorArray.push(book.author);
        }
      }
      return authorArray.length;
    } else if (category === 'read') {
      let convertedBooks = this.read.map((book: Book) => book);
      let authorArray: string[] = [];
      for (const book of convertedBooks) {
        if (authorArray.indexOf(book.author) === -1) {
          authorArray.push(book.author);
        }
      }
      return authorArray.length;
    }

    return 0;
  }

  getTotalBooks(category: string): number {
    if (category === 'tbr') {
      return this.tbr.length;
    } else if (category === 'dnf') {
      return this.dnf.length;
    } else if (category === 'read') {
      return this.read.length;
    } else if (category === 'currently reading') {
      return this.currentlyReading.length;
    }

    return 0;
  }

  getCoverImage(category: string): string {
    if (category === 'tbr') {
      return this.tbr.map((book: Book) => book.cover_url);
    } else if (category === 'dnf') {
      return this.dnf.map((book: Book) => book.cover_url);
    } else if (category === 'read') {
      return this.read.map((book: Book) => book.cover_url);
    } else if (category === 'currently reading') {
      return this.currentlyReading.map((book: Book) => book.cover_url);
    }

    return '';
  }

  getMoods(category: string): string[] {
    if (category === 'dnf') {
      let dnfBooks = this.dnf.map((book: Book) => book);
      let moods: string[] = [];
      for (const book of dnfBooks) {
        for (const mood of book.moods) {
          if (moods.indexOf(mood) === -1) {
            moods.push(mood);
          }
        }
      }
      return moods;
    } else if (category === 'read') {
      let readBooks = this.read.map((book: Book) => book);
      let moods: string[] = [];
      for (const book of readBooks) {
        for (const mood of book.moods) {
          if (moods.indexOf(mood) === -1) {
            moods.push(mood);
          }
        }
      }
      return moods;
    } else if (category === 'currently reading') {
      let currentlyReadingBooks = this.currentlyReading.map(
        (book: Book) => book,
      );
      let moods: string[] = [];
      for (const book of currentlyReadingBooks) {
        if (book.moods) {
          for (const mood of book.moods) {
            if (moods.indexOf(mood) === -1) {
              moods.push(mood);
            }
          }
        }
      }
      return moods;
    }

    return [];
  }

  getCategories(category: string): string[] {
    if (category === 'tbr') {
      let convertedBooks = this.tbr.map((book: Book) => book);
      let categories: string[] = [];
      for (const book of convertedBooks) {
        if (book.category) {
          if (categories.indexOf(book.category) === -1) {
            categories.push(book.category);
          }
        }
      }
      return categories;
    } else if (category === 'dnf') {
      let convertedBooks = this.dnf.map((book: Book) => book);
      let categories: string[] = [];
      for (const book of convertedBooks) {
        if (book.category) {
          if (categories.indexOf(book.category) === -1) {
            categories.push(book.category);
          }
        }
      }
      return categories;
    } else if (category === 'read') {
      let convertedBooks = this.read.map((book: Book) => book);
      let categories: string[] = [];
      for (const book of convertedBooks) {
        if (book.category) {
          if (categories.indexOf(book.category) === -1) {
            categories.push(book.category);
          }
        }
      }
      return categories;
    } else if (category === 'currently reading') {
      let convertedBooks = this.currentlyReading.map((book: Book) => book);
      let categories: string[] = [];
      for (const book of convertedBooks) {
        if (book.category) {
          if (categories.indexOf(book.category) === -1) {
            categories.push(book.category);
          }
        }
      }
      return categories;
    }

    return [];
  }
}
