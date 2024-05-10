import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { DataService } from '../../../../services/data.service';
import { Observable, Subscription, take } from 'rxjs';
import { calculateBookRating } from '../../../../../utils/shared-functions';
import { Book } from '../../../../models/states';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    NzFormItemComponent,
    ReactiveFormsModule,
    MatFormField,
    MatOption,
    MatSelect,
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
})
export class EditBookComponent implements OnInit, OnDestroy {
  @Input() bookIsbn: string | undefined | null = null;
  newCategory = '';
  status = '';
  activeRoute = inject(ActivatedRoute);
  dataService = inject(DataService);
  currentCollection = this.activeRoute.snapshot.paramMap.get('collectionName');
  currentBookSubscription: Subscription | undefined;
  currentBook$: Observable<Book[]> | undefined;
  router = inject(Router);
  editBookForm = new FormGroup({
    comment: new FormControl(''),
    mood: new FormControl(''),
    pace: new FormControl(''),
    completed: new FormControl(''),
    dnfReason: new FormControl(''),
    pagesRead: new FormControl(''),
    oneStarRating: new FormControl(0),
    twoStarRating: new FormControl(0),
    threeStarRating: new FormControl(0),
    fourStarRating: new FormControl(0),
    fiveStarRating: new FormControl(0),
  });

  // constructor(private currentLocation: Location) {}

  ngOnInit() {
    if (this.bookIsbn) {
      this.currentBook$ = this.dataService.getBookId(this.bookIsbn);
    }
  }

  setNewCategory(category: string): void {
    this.newCategory = category;
  }

  setStatus(newStatus: string): void {
    this.status = newStatus;
  }

  handleSaveClick() {
    if (this.currentBook$) {
      this.currentBookSubscription = this.currentBook$
        .pipe(take(2))
        .subscribe((result) => {
          if (result) {
            const updatedBook = result[0];

            if (updatedBook) {
              if (this.editBookForm?.value?.comment !== '') {
                if (updatedBook?.comments[0] === '') {
                  updatedBook.comments = [
                    this.editBookForm.value.comment ?? '',
                  ];
                } else {
                  updatedBook.comments.push(
                    this.editBookForm.value.comment ?? '',
                  );
                }
              }

              if (this.editBookForm?.value.mood !== '') {
                updatedBook.moods.push(this.editBookForm.value.mood ?? '');
              }

              if (this.editBookForm?.value.pace !== '') {
                updatedBook.pace = this.editBookForm.value.pace ?? '';
              }

              if (this.status !== '') {
                updatedBook.status = this.status;
              }

              if (this.editBookForm?.value?.dnfReason !== '') {
                updatedBook.dnf_reason =
                  this.editBookForm.value.dnfReason ?? '';
              }

              if (this.editBookForm?.value?.pagesRead !== '') {
                updatedBook.pages_read = this.editBookForm.value.pagesRead
                  ? Number(this.editBookForm.value.pagesRead)
                  : 0;
              }

              if (this.newCategory !== '') {
                updatedBook.bookshelf_category = this.newCategory;
              }

              const newRating = calculateBookRating(
                this.editBookForm.value.oneStarRating ?? 0,
                this.editBookForm.value.twoStarRating ?? 0,
                this.editBookForm.value.threeStarRating ?? 0,
                this.editBookForm.value.fourStarRating ?? 0,
                this.editBookForm.value.fiveStarRating ?? 0,
              );

              if (newRating !== 0) {
                updatedBook.rating = newRating;
              }
              if (result) {
                this.dataService.updateBook(
                  result[0].id,
                  updatedBook,
                  updatedBook.isbn.toString(),
                );
                this.router.navigate([
                  '/home/collection/' + this.currentCollection,
                ]);
              }
            }
          }
        });
    }
  }

  ngOnDestroy() {
    this.currentBookSubscription?.unsubscribe();
  }
}
