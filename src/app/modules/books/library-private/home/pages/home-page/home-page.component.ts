import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { debounceTime, Observable, Subscription, switchMap, pluck, takeUntil, Subject } from 'rxjs';
import {AuthService} from '../../../../../../services/auth.service/auth.service';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../../../../services/category.service/category.service';
import { BooksService } from '../../../../../../services/books.service/books.service';
import { Category } from '../../../../../../core/category.interface';
import { Books, BooksResponse } from '../../../../../../core/books.interface';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() privateLibrary: EventEmitter<Books[]> = new EventEmitter()
  search = new FormControl('');
  books: Books[] = [];
  publicListBook: Books[] =[];
  // selectedCategory!: number;
  // searchTerm: string = '';
  categories$: Observable<Category[]>
  destroy$: Subject<boolean> = new Subject<boolean>()
  

  constructor(
    private categoryService:CategoryService,
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService,) {
    this.categories$ = this.categoryService.getCategories()
  }


  ngOnInit(): void {
    this.getBooks();
    this.getcharactersbysearch();
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
  // logout(){
  //   this.router.navigateByUrl('auth/login');
  //   this.booksService.logout();
  // }
  getcharactersbysearch(){
    this.search.valueChanges
    .pipe(
      debounceTime(1000),
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
        this.books = books
        
      },
    })
  }


  getBooksOwnerList() {
    if (this.books.length == 0) {
      this.booksService.getBooksOwner()
        .subscribe(
          (res: Books[]) => {
            this.books = res;
            this.privateLibrary.emit( this.books)//emito mi output
            console.log(res, 'respuestas book')
          });
    }

  }


}
