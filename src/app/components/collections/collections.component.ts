import { CollectionDisplayComponent } from './components/collection-display/collection-display.component';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionDisplayComponent, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  bookshelfId: number | undefined;
  dataService = inject(DataService);
  bookshelfResult$ = this.dataService.getBookshelf();

  ngOnInit() {
    let bookshelfSubscription = this.bookshelfResult$.subscribe((bookshelf) => {
      this.bookshelfId = bookshelf[0].id;
    });

    // Unsubscribe after the id has been fetched.
    if (bookshelfSubscription && this.bookshelfId) {
      bookshelfSubscription.unsubscribe();
    }
  }
}
