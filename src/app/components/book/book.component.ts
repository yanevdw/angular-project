import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable, take } from 'rxjs';
import { Book } from '../../models/states';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftEndOnRectangle } from '@ng-icons/heroicons/outline';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgIconComponent, AsyncPipe],
  viewProviders: [provideIcons({ heroArrowLeftEndOnRectangle })],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit, OnDestroy {
  activeRoute = inject(ActivatedRoute);
  selectedBook = this.activeRoute.snapshot.paramMap.get('bookIsbn');
  dataService = inject(DataService);
  bookResult$: Observable<Book[]> | undefined;
  book: string[] | undefined = undefined;
  bookDetails: Book[] | undefined = undefined;

  ngOnInit() {
    this.bookResult$ = this.dataService.getBook(this.selectedBook ?? '');
    this.bookResult$.pipe(take(2)).subscribe();
  }

  ngOnDestroy() {}
}
