import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Books} from '../../../../core/books.interface';
import {Filter} from '../../../../core/filter.interface';
import {SelectItem} from '../../../../core/select.interface';
import {BooksService} from '../../../../services/books.service/books.service';
import {AuthService} from 'src/app/services/auth.service/auth.service';
import {Category} from "../../../../core/category.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  username = this.authService.user.username;
  books: Books[] = [];
  selectedCategory!: number;
  searchTerm = '';
  filterSubscription!: Subscription;

  categories$: Observable<Category[]>


  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService,) {
    this.categories$ = this.booksService.getCategories()
  }


  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooksOwner()
      .subscribe(books => {
        this.books = books;
      })

    // this.books = this.booksService.userBooks;
  }


}
