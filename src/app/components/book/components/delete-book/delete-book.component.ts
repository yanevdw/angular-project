import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [FormsModule, NgIcon],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss',
})
export class DeleteBookComponent {
  @Input() bookIsbn: string | undefined | null;
  dataService = inject(DataService);

  handleDeleteClick() {
    if (this.bookIsbn) {
      console.log('Here');
      this.dataService.deleteBook(this.bookIsbn);
    } else {
      //TODO: Add feedback saying the book can't be deleted
    }
  }
}
