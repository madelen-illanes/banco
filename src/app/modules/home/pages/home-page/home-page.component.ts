import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Books } from '../../../../core/books.interface';
import { Filter } from '../../../../core/filter.interface';
import { SelectItem } from '../../../../core/select.interface';
import { BooksService } from '../../../../services/books.service/books.service';
import { AuthService } from 'src/app/services/auth.service/auth.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  username = this.authService.user.username;
  categories: SelectItem[] = [];
  books: Books[] = [];
  selectedCategory: number | null = null;
  searchTerm = '';
  filterSubscription!: Subscription;
  private readonly URL = environment.api
  
  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService
    ) { }
    

  ngOnInit(): void {
    this.getCategories();
    this.getBooks();
  }

  async getCategories() {
    if (this.booksService.categories.length == 0) {
      await lastValueFrom(this.booksService.getCategories()).then(res => {
        this.booksService.categories = res.slice(0, 54);
      });
    }
    const categoriesToItems = this.booksService.categories.map(category => {
      return {
        label: category.description,
        value: category.id
      }
    });
    this.categories = [...this.categories, ...categoriesToItems];
  }

  async getBooks() {
    if (this.booksService.userBooks.length == 0) {
      await lastValueFrom(this.booksService.getBooksOwner()).then(res => {
        this.booksService.userBooks = res;
        console.log('😊',res)
      });
    }
    this.books = this.booksService.userBooks;
  }

 
}