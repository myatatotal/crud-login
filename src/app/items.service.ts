import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from './item.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ItemsService {
  baseUrl = 'http://localhost:3000/items'; // Replace with your JSON Server endpoint

  // ... rest of the code remains the same


  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Item>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateItem(id: number, item: Item): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, item, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteItem(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
