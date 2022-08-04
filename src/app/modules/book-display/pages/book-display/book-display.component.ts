import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Books } from 'src/app/core/books.interface';
import { BooksService } from '../../../../services/books.service/books.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss']
})
export class BookDisplayComponent implements OnInit {
  books!: Books;
  constructor(
    private activateRoute: ActivatedRoute,
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
  this.activateRoute.params
 
  .pipe(
    switchMap(({id})=> this.booksService.getBookId(id))
  )
  .subscribe(resp => this.books = resp);

  }
  get bookTitle() {
    return this.books?.title
   
  }

}
