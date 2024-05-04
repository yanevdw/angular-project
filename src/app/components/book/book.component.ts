import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { Book } from '../../models/states';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnDestroy {
  activeRoute = inject(ActivatedRoute);
  selectedBook = this.activeRoute.snapshot.paramMap.get('bookIsbn');
  dataService = inject(DataService);
  bookResult$ = this.dataService.getBook(this.selectedBook ?? '');
  bookSubscription: Subscription | undefined = undefined;
  book: string[] | undefined = undefined;
  bookDetails: Book[] | undefined = undefined;

  constructor() {
    this.bookSubscription = this.bookResult$.subscribe((book) => {
      localStorage.setItem('selectedbook', JSON.stringify(book));
    });

    this.book = JSON.parse(localStorage.getItem('selectedbook') as string);
    this.bookDetails = this.book?.map((book) => {
      return book as unknown as Book;
    });
  }

  ngOnDestroy() {
    this.bookSubscription?.unsubscribe();
    localStorage.removeItem('selectedbook');
  }
}
