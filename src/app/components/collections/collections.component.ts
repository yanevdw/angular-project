import { CollectionDisplayComponent } from './components/collection-display/collection-display.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionDisplayComponent, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {}
