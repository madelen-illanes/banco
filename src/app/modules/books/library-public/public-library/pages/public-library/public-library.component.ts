import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, pluck,debounceTime, Observable, Subject,switchMap } from 'rxjs';
import { Books, BooksResponse } from 'src/app/core/books.interface';
import { Category } from '../../../../../../core/category.interface';
import { Filter } from 'src/app/core/filter.interface';
import { BooksService } from '../../../../../../services/books.service/books.service';
import { CategoryService } from '../../../../../../services/category.service/category.service';

@Component({
  selector: 'app-public-library',
  templateUrl: './public-library.component.html',
  styleUrls: ['./public-library.component.scss']
})
export class PublicLibraryComponent implements OnInit {
  search = new FormControl( );
  books: Books[] = [];
  publicListBook: Books[] =[];
  selectedCategories: number[] = [];
  categories$: Observable<Category[]>
  books$:Observable<Books[]>
  destroy$: Subject<boolean> = new Subject<boolean>()


  constructor(
    private categoryService:CategoryService,
    private booksService: BooksService,

  ) { 
    this.categories$ = this.categoryService.getCategories()
    this.books$ = this.booksService. getBooksOwner()
  }

  ngOnInit(): void {
    this.getBooks();
    this.getcharactersbysearch()
  }

  ngOnDestroy(){
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   this.destroy$.next(false)
   this.destroy$.unsubscribe()
  }
 

  getBooks() {
    this.booksService.getBooksOwner()
      .subscribe(books => {
        this.books = books;
      })
    }
   
    getcharactersbysearch(){
      this.search.valueChanges
        .pipe(
          debounceTime(500),
          switchMap<string, Observable<BooksResponse>>((value)=>{
            return this.booksService.filterBooks({
              title: value,
              category: [57]
            })
          }),
          pluck('items'),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next:(books) =>{
            const publicBooks = books.filter((books:Books) => books.public).slice(0,30)
            this.publicListBook = publicBooks
            console.log(this.publicListBook)
          }
        })
      }
       
    
     
      clickCheckBox(event: CustomEvent) {
        if(event.detail.checked){
          this.selectedCategories.push(event.detail.value);
          this.getcharactersbysearch();
          return;
        }
        this.selectedCategories = this.selectedCategories.filter(category => category != event.detail.value);
        this.getcharactersbysearch();
        console.log(this.clickCheckBox)
      }
       
}
