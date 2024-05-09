import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrentBookshelfState } from '../../store/reducer';
import { selectedBookshelf } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss',
})
export class CollectionDetailsComponent {
  activeRoute = inject(ActivatedRoute);
  selectedCollection = this.activeRoute.snapshot.paramMap.get('collectionName');
  bookStore = inject(Store<CurrentBookshelfState>);
  currentBooks$ = this.bookStore.select(selectedBookshelf);

  constructor() {
    this.selectedCollection = this.selectedCollection?.replace('-', ' ') ?? '';
  }
}
