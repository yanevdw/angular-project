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
  tbrMoods = this.getMoods('tbr');

  currentCategories = this.getCategories('currently reading');
  readCategories = this.getCategories('read');
  dnfCategories = this.getCategories('dnf');
  tbrCategories = this.getCategories('tbr');

  getAuthorCount(category: string): number {
    let authorArray;
    if (category === 'tbr') {
      authorArray = this.tbr.map((book: Book) => book.author);
      return authorArray.length;
    } else if (category === 'dnf') {
      authorArray = this.dnf.map((book: Book) => book.author);
      return authorArray.length;
    } else if (category === 'read') {
      authorArray = this.read.map((book: Book) => book.author);
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

  getMoods(category: string): string {
    if (category === 'tbr') {
      return this.tbr.map((book: Book) => book.moods[0]);
    } else if (category === 'dnf') {
      return this.dnf.map((book: Book) => book.moods[0]);
    } else if (category === 'read') {
      return this.read.map((book: Book) => book.moods[0]);
    } else if (category === 'currently reading') {
      return this.currentlyReading.map((book: Book) => book.moods[0]);
    }

    return '';
  }

  getCategories(category: string): string {
    if (category === 'tbr') {
      return this.tbr.map((book: Book) => book.category);
    } else if (category === 'dnf') {
      return this.dnf.map((book: Book) => book.category);
    } else if (category === 'read') {
      return this.read.map((book: Book) => book.category);
    } else if (category === 'currently reading') {
      return this.currentlyReading.map((book: Book) => book.category);
    }

    return '';
  }
}
