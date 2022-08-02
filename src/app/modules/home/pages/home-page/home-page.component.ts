import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Books } from '../../../../core/books.interface';
import { Filter } from '../../../../core/filter.interface';
import { SelectItem } from '../../../../core/select.interface';
import { BooksService } from '../../../../services/books.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class BooksComponent implements OnInit {
  categories: SelectItem[] = [{ label: 'Seleccione una categoría', value: null }];
  books: Books[] = [];
  selectedCategory: number | null = null;
  searchTerm = '';
  filterSubscription!: Subscription;
  private readonly URL = environment.api
  constructor(

    private booksService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBooks();
  }

  async getCategories() {
    if (this.booksService.categories.length == 0) {
      await lastValueFrom(this.booksService.getCategories()).then(res => {
        this.booksService.categories = res.slice(0, 5);
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
      });
    }
    this.books = this.booksService.userBooks;
  }

  // onAddBook() {
  //   this.router.navigateByUrl(`${URL}/${AppRoutes.NEW_BOOK}`);
  // }

  // onSelectBook(id: string){
  //   this.router.navigateByUrl(`${URL}/${id}`);
  // }
 
  onSearch(event: CustomEvent) {
    this.searchTerm = event.detail.target.value;
    if (event.detail.target.value.length > 0) {
      const filter: Filter = {
        title: event.detail.target.value,
        ...(this.selectedCategory && { category: [this.selectedCategory] })
      }
      this.filterSubscription?.unsubscribe();
      this.filterSubscription = this.booksService.filterBooks(filter).subscribe(res => {
        this.books = res.items;
      });
    } else {
      this.getBooks();
    }
  }

  handleSelectedItem(event: CustomEvent) {
    this.selectedCategory = event.detail.value;
    if (this.selectedCategory) {
      const filter: Filter = {
        ...(this.searchTerm.length > 0 && { title: this.searchTerm }),
        category: [this.selectedCategory!]
      };
      this.filterSubscription?.unsubscribe();
      this.filterSubscription = this.booksService.filterBooks(filter).subscribe(res => {
        this.books = res.items;
      });
    } else {
      this.getBooks();
    }
  }
}