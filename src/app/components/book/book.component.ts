import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable, Subscription, take } from 'rxjs';
import { Book } from '../../models/states';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { AsyncPipe } from '@angular/common';
import {
  matDelete,
  matEdit,
  matKeyboardBackspace,
} from '@ng-icons/material-icons/baseline';
import { AddBookComponent } from '../explore/components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    NgIconComponent,
    AsyncPipe,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    NzButtonComponent,
    RouterLink,
  ],
  viewProviders: [provideIcons({ matDelete, matEdit, matKeyboardBackspace })],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit, OnDestroy {
  activeRoute = inject(ActivatedRoute);
  selectedBook = this.activeRoute.snapshot.paramMap.get('bookIsbn');
  dataService = inject(DataService);
  bookResult$: Observable<Book[]> | undefined;
  bookSubscription: Subscription | undefined;
  book: string[] | undefined = undefined;

  ngOnInit() {
    this.bookResult$ = this.dataService.getBook(this.selectedBook ?? '');
    this.bookSubscription = this.bookResult$.pipe(take(2)).subscribe();
  }

  ngOnDestroy() {
    this.bookSubscription?.unsubscribe();
  }
}
