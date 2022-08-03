import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Books , BooksResponse} from '../../core/books.interface';
import { Filter } from '../../core/filter.interface';
import { Category } from '../../core/category.interface'
import {InterceptorService} from '../../interceptors/interceptor.service'
@Injectable({
  providedIn: 'root'
})
export class BooksService implements HttpInterceptor{
   intercept(
    req: HttpRequest<any>,
    next: HttpHandler)
    : Observable<HttpEvent<any>> {
    const access_token = sessionStorage.getItem('access_token')
    const newReq = req.clone({
      setHeaders: {
      Authorization: `Bearer ${access_token}`,
      },
    });
    return next.handle(newReq);
  }  
  
  private readonly URL = environment.api
  userBooks: Books[] = [];
  publicBooks: Books[] = [];
  categories: Category[] = [];




  constructor(private http: HttpClient) {
  
   }

  getBooksOwner(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.URL}/books/owner`);
  }

  getBookId(id: string): Observable<Books> {
    return this.http.get<Books>(`${this.URL}/books/owner${id}`);
  }

  filterBooks(filters: Filter): Observable<BooksResponse> {
    return this.http.post<BooksResponse>(`${this.URL}/books/filter`, filters);
  }

  createAbook(books: Books): Observable<any> {
    return this.http.post(`${this.URL}/books/owner`, books);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }
}
