import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../models/states';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss',
})
export class CollectionDetailsComponent {
  activeRoute = inject(ActivatedRoute);
  selectedCollection = this.activeRoute.snapshot.paramMap.get('collectionName');
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
  books = [
    { title: 'Divergent', author: 'Veronica Roth' },
    { title: 'Insurgent', author: 'Veronica Roth' },
    { title: 'Allegiant', author: 'Veronica Roth' },
    { title: 'Four', author: 'Veronica Roth' },
    { title: 'Chain of Gold', author: 'Cassandra Clare' },
  ];

  constructor() {
    this.selectedCollection = this.selectedCollection?.replace('-', ' ') ?? '';
  }
}
