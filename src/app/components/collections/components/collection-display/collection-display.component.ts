import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrentBookshelfState } from '../../../../store/reducer';
import { selectedBookshelf } from '../../../../store/selectors';
import { Book } from '../../../../models/states';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-display',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './collection-display.component.html',
  styleUrl: './collection-display.component.scss',
})
export class CollectionDisplayComponent implements OnInit, OnDestroy {
  @Input() category = '';
  bookStore = inject(Store<CurrentBookshelfState>);
  currentBooks$ = this.bookStore.select(selectedBookshelf);
  bookshelfSubscription: Subscription | undefined = undefined;

  ngOnInit() {
    this.bookshelfSubscription = this.currentBooks$.subscribe();
  }

  getAuthorCount(books: Book[]): number {
    let authorArray: string[] = [];
    for (const book of books) {
      if (authorArray.indexOf(book.author) === -1) {
        authorArray.push(book.author);
      }
    }
    return authorArray.length;
  }

  getCoverImage(books: Book[]): string[] {
    let covers: string[] = [];
    for (const book of books) {
      covers.push(book.cover_url);
    }

    return covers;
  }

  getMoods(books: Book[]): string[] {
    let moods: string[] = [];
    for (const book of books) {
      for (const mood of book.moods) {
        if (moods.indexOf(mood) === -1) {
          moods.push(mood);
        }
      }
    }
    return moods;
  }

  getCategories(books: Book[]): string[] {
    let categories: string[] = [];
    for (const book of books) {
      if (book.category) {
        if (categories.indexOf(book.category) === -1) {
          categories.push(book.category);
        }
      }
    }
    return categories;
  }

  ngOnDestroy(): void {
    this.bookshelfSubscription?.unsubscribe();
  }
}
