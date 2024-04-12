import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss',
})
export class CollectionDetailsComponent {
  activeRoute = inject(ActivatedRoute);

  selectedCollection = this.activeRoute.snapshot.paramMap.get('collectionName');

  books = [
    { title: 'Divergent', author: 'Veronica Roth' },
    { title: 'Insurgent', author: 'Veronica Roth' },
    { title: 'Allegiant', author: 'Veronica Roth' },
    { title: 'Four', author: 'Veronica Roth' },
    { title: 'Chain of Gold', author: 'Cassandra Clare' },
  ];
}
