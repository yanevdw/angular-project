import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Results } from '../models/states';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  getBooks(bookName: string) {
    console.log(this.http.get<Results>(this.baseUrl + bookName));
    return this.http.get<Results>(this.baseUrl + bookName);
  }
}
