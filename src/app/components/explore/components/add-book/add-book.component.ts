import { Component, inject, Input } from '@angular/core';
import { Book, VolumeInfo } from '../../../../models/states';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { DataService } from '../../../../services/data.service';
import { Store } from '@ngrx/store';
import { CurrentBookshelfState } from '../../../../store/reducer';
import { selectedBookshelf } from '../../../../store/selectors';
import { addBook } from '../../../../store/actions';
import { calculateBookRating } from '../../../../../utils/shared-functions';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    NzButtonComponent,
    MatSelect,
    MatLabel,
    MatFormFieldModule,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzRowDirective,
    NzFormDirective,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  @Input() book: VolumeInfo | undefined;
  selectedCategory = '';
  dataService = inject(DataService);
  store = inject(Store<CurrentBookshelfState>);
  bookshelf$ = this.store.select(selectedBookshelf);

  readForm = new FormGroup({
    comment: new FormControl(''),
    mood: new FormControl(''),
    pace: new FormControl(''),
    completed: new FormGroup(''),
    oneStarRating: new FormControl(0),
    twoStarRating: new FormControl(0),
    threeStarRating: new FormControl(0),
    fourStarRating: new FormControl(0),
    fiveStarRating: new FormControl(0),
  });

  dnfForm = new FormGroup({
    dnfReason: new FormControl(''),
    oneStarRating: new FormControl(0),
    twoStarRating: new FormControl(0),
    threeStarRating: new FormControl(0),
    fourStarRating: new FormControl(0),
    fiveStarRating: new FormControl(0),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  handleAddBookClick() {
    if (document.getElementById('add-book-container')) {
      document.getElementById('add-book-container')!.style.display = 'block';
    }
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }

  handleAddBook() {
    let newBook: Book = {} as Book;

    newBook.title = this.book?.title ?? '';
    newBook.author = this.book?.authors?.[0] ?? '';
    newBook.bookshelf_category = this.selectedCategory;
    newBook.cover_url = this.book?.imageLinks?.thumbnail ?? '';
    newBook.description = this.book?.description ?? '';
    newBook.isbn = Number(this.book?.industryIdentifiers?.[0].identifier);
    newBook.pages = this.book?.pageCount ? Number(this.book?.pageCount) : 0;
    newBook.category = this.book?.categories?.[0] ?? '';
    newBook.pages_read = 0;
    newBook.bookshelfId = localStorage.getItem('bookshelfId') ?? '';

    if (
      this.selectedCategory === 'reading' ||
      this.selectedCategory === 'tbr'
    ) {
      newBook.comments = [''];
      newBook.dnf_reason = '';
      newBook.moods = [''];
      newBook.pace = '';
      newBook.rating = 0;
      newBook.status = 'not completed';
    } else if (this.selectedCategory === 'dnf') {
      newBook.dnf_reason = this.dnfForm.value.dnfReason ?? '';
      newBook.comments = [''];
      newBook.moods = [''];
      newBook.pace = '';
      newBook.rating = calculateBookRating(
        this.dnfForm.value.oneStarRating ?? 0,
        this.dnfForm.value.twoStarRating ?? 0,
        this.dnfForm.value.threeStarRating ?? 0,
        this.dnfForm.value.fourStarRating ?? 0,
        this.dnfForm.value.fiveStarRating ?? 0,
      );
      newBook.status = 'not completed';
    } else if (this.selectedCategory === 'read') {
      let comments: string[] = [];
      comments.push(this.readForm?.value?.comment ?? '');
      newBook.comments = comments;
      newBook.dnf_reason = '';
      let moods: string[] = [];
      moods.push(this.readForm?.value?.mood ?? '');
      newBook.moods = moods;
      newBook.pace = this.readForm?.value.pace ?? '';
      newBook.rating = calculateBookRating(
        this.readForm.value.oneStarRating ?? 0,
        this.readForm.value.twoStarRating ?? 0,
        this.readForm.value.threeStarRating ?? 0,
        this.readForm.value.fourStarRating ?? 0,
        this.readForm.value.fiveStarRating ?? 0,
      );

      newBook.status = 'completed';
    }

    this.store.dispatch(
      addBook({ book: newBook, bookshelfId: newBook.bookshelfId }),
    );
  }
}
