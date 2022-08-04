import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [];
  
  constructor(private http: HttpClient) { }

  private readonly URL = environment.api

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }
}
