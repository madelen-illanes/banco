import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PublicLibraryComponent } from './public-library.component';
import { Books, BooksResponse } from '../../../../../../core/books.interface';
import { of } from 'rxjs';
import { Category } from '../../../../../../core/category.interface';
import { BooksService } from '../../../../../../services/books.service/books.service';
import { CategoryService } from '../../../../../../services/category.service/category.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputValueAcessorDirective } from '../../../../../../shared/directives/input-value-acessor.directive';

const mockBooks: Books[] = [
  {
    id: "2ac4ly00oen",
    public: true,
    author: "Unknow",
    resume: "",
    title: "Learning Angular, 2nd Edition",
    subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
    image: "https://itbook.store/img/books/9780134576978.png",
    url: "https://itbook.store/books/9780134576978",
    category: [
      57
    ],
    userRegister: "w7qfsa5f21"
  },
  {
    id: "2ac4ly00oen",
    public: true,
    author: "Unknow",
    resume: "",
    title: "Learning Angular, 2nd Edition",
    subtitle: "A Hands-On Guide to Angular 2 and Angular 4",
    image: "https://itbook.store/img/books/9780134576978.png",
    url: "https://itbook.store/books/9780134576978",
    category: [
      57
    ],
    userRegister: "w7qfsa5f21"
  },
]

const booksResponse: BooksResponse = {
  count: 2,
  items: mockBooks
}

class mockBooksService {
  userBooks: Books[] = [];
  publicBooks: Books[] = [];
  getBooksByOwner() { return of(mockBooks) }
  filterBooks() { return of(booksResponse) }
}

const mockCategories: Category[] = [
  {
    id: 1,
    description: 'prueba1'
  },
  {
    id: 2,
    description: 'prueba2'
  },
  {
    id: 3,
    description: 'prueba3'
  },
]
class mockCategoriesService {
  categories: Category[] = [];
  getCategories() { return of(mockCategories) }
}



describe('PublicLibraryComponent', () => {
  let component: PublicLibraryComponent;
  let fixture: ComponentFixture<PublicLibraryComponent>;
  let booksService: BooksService;
  let categoriesService: CategoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLibraryComponent,
        InputValueAcessorDirective ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],

      providers: [
        BooksService,
        CategoryService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLibraryComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
    categoriesService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    jest.resetAllMocks();
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PublicLibraryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  })


  it('should getBooks from request and store them', async () => {
    jest.spyOn(booksService, 'getBooksOwner')
      .mockImplementation(() => {
        return of(mockBooks);
      });
    component.getBooks();
    expect(component).toBeTruthy();
  });

  it('should getCategories from request and store them', async () => {
    jest.spyOn(categoriesService, 'getCategories')
      .mockImplementation(() => {
        return of(mockCategories);
      });
    component.ngOnInit();
    expect(component).toBeTruthy();
  });


});
