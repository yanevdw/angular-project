import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-display',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collection-display.component.html',
  styleUrl: './collection-display.component.scss',
})
export class CollectionDisplayComponent {
  @Input() category = '';
  mockGenres = ['Fantasy', 'Sci-Fi', 'Dystopian'];
}
