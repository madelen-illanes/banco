import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import {Books} from '../../../../core/books.interface';
import {BooksService} from '../../../../services/books.service/books.service';
import {AuthService} from 'src/app/services/auth.service/auth.service';
import {Category} from "../../../../core/category.interface";
import { CategoryService } from '../../../../services/category.service/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  books: Books[] = [];
  selectedCategory!: number;
  searchTerm = '';
  filterSubscription!: Subscription;

  categories$: Observable<Category[]>


  constructor(
    private categoryService:CategoryService,
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService,) {
    this.categories$ = this.categoryService.getCategories()
  }


  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooksOwner()
      .subscribe(books => {
        this.books = books;
      })


  }


}
