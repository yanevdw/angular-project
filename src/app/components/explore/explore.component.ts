import { Component, inject, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { VolumeInfo } from '../../models/states';
import { matTouchAppOutline } from '@ng-icons/material-icons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AddBookComponent } from './components/add-book/add-book.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent, AddBookComponent],
  viewProviders: [provideIcons({ matTouchAppOutline })],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnDestroy {
  apiService = inject(ApiService);
  searchForm = this.fb.group({
    searchTerm: '',
  });

  searchResult: string = '';
  searchedItems: VolumeInfo[] = [];
  selectedBook: VolumeInfo | undefined;

  constructor(private fb: NonNullableFormBuilder) {}

  handleSearchClick() {
    let searchInput = this.searchForm.value.searchTerm ?? '';

    if (searchInput !== '') {
      searchInput = searchInput?.toLowerCase().replaceAll(' ', '-');
      this.apiService
        .getBooks(searchInput)
        .pipe(take(1))
        .subscribe((response) => {
          const searchResults = response.items.map((item) => item.volumeInfo);

          localStorage.setItem('searchResults', JSON.stringify(searchResults));
          this.searchResult = JSON.parse(
            localStorage.getItem('searchResults') as string,
          );

          this.searchedItems = JSON.parse(
            localStorage.getItem('searchResults') as string,
          ).map((volume: VolumeInfo) => volume);
        });
    }
  }

  handleBookClick(book: VolumeInfo) {
    this.selectedBook = book;
  }

  ngOnDestroy() {
    this.selectedBook = undefined;
  }
}
