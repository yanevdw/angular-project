import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { DataService } from '../../../../services/data.service';
import { Observable, take } from 'rxjs';
import { Book } from '../../../../models/states';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [FormsModule, NgIcon],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss',
})
export class DeleteBookComponent implements OnInit {
  @Input() bookIsbn: string | undefined | null;
  dataService = inject(DataService);
  currentBook$: Observable<Book[]> | undefined;
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  currentCollection = this.activeRoute.snapshot.paramMap.get('collectionName');

  ngOnInit() {
    if (this.bookIsbn) {
      this.currentBook$ = this.dataService.getBookId(this.bookIsbn);
    }
  }

  handleDeleteClick() {
    if (this.currentBook$) {
      this.currentBook$.pipe(take(2)).subscribe((result) => {
        if (result) {
          this.dataService.deleteBook(result[0].id);
        }
      });
      this.router.navigate(['/home/collection/' + this.currentCollection]);
    }
  }
}
