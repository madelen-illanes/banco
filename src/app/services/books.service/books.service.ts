import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { Books , BooksResponse} from '../../core/books.interface';
import { Filter } from '../../core/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  private readonly URL = environment.api
  userBooks: Books[] = [];
  publicBooks: Books[] = [];
  

  constructor(private http: HttpClient) {}

  getBooksOwner(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.URL}/books/owner`);
  }

  //ver especificaciones del libro
  getBookId(id: string): Observable<Books> {
    return this.http.get<Books>(`${this.URL}/books/owner/${id}`);
  }

  filterBooks(filter: Filter): Observable<BooksResponse> {
    return this.http.post<BooksResponse>(`${this.URL}/books/filter`, filter);
  }

  createAbook(books: Books): Observable<any> {
    return this.http.post(`${this.URL}/books/owner`, books);
  }
  editarAbook(id: string, books: Books): Observable<any> {
    return this.http.post(`${this.URL}/books/owner/${id}`, books);
  }

  updateBook(id: string, books: Books): Observable<any> {
    return this.http.put<Books>(`${this.URL}/books/owner/${id}`,books);
  }

}
