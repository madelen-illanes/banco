import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Books } from '../../../../../../core/books.interface';
import { BooksService } from '../../../../../../services/books.service/books.service';

import { environment } from '../../../../../../../environments/environment';


@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  books: Books[] = [];
  //[x: string]: any;
  book!: Books;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private booksService: BooksService
  ) { }
  private readonly URL = environment.api
  ngOnInit(): void {
  this.activateRoute.params
 
  
  .pipe(
    switchMap(({id})=> this.booksService.getBookId(id))
  ).subscribe(resp => {console.log(resp);this.book = resp});

  }
  /*get bookTitle() {
    return this.books?.title
   
  }
  get bookImage() {
    return (this.books && this.books.image) ? this.books.image : null
  }

  get bookAuthor() {
    return (this.books && this.books.author) ? this.books.author : null
  }

  get bookUrl() {
    return (this.books && this.books.url) ? this.books.url : null
  }

  get bookResume() {
    return (this.books && this.books.resume) ? this.books.resume : null
  }

  get bookCategory() {
    return (this.books && this.books.category) ? this.books.category : null
  }*/

 
}
