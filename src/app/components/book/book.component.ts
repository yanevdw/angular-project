import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  mockComments = [
    'This was a really good book!',
    "I can't believe that happened!",
    'Another plot twist?',
  ];
}
