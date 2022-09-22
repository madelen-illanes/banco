import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Books, BooksResponse } from '../../core/books.interface';
import { Filter } from '../../core/filter.interface';
import { environment } from '../../../environments/environment';
import { BooksService } from './books.service';

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
  }
]

describe('BooksService', () => {
  let service: BooksService;
  let http: HttpTestingController;
  let URL = environment.api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController );
    service = TestBed.inject(BooksService);
  });

  it('should filter books on filterBooks', () => {
    const filter : Filter = {
      title: 'test',
      category: [1]
    }
    const mockResponse: BooksResponse = {
      count: 2,
      items: mockBooks
    }
    service.filterBooks(filter).subscribe((res: any) => {
      expect(res.count).toBe(2);
      expect(res.items).toEqual(mockBooks);
    });
 
    let url = URL + '/books/filter'
    const req = http.expectOne(url);
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  it('should be created', () => {
    const mockBook : Books = {
      id: '1',
      title: 'gatos',
      subtitle: 'gatos',
      author: 'gatos',
      url: 'gato.com',
      image: 'gato.com',
      resume: 'gato',
      public: false,
      category: [1],
      userRegister: 'gato'
    }
    service.createAbook(mockBook).subscribe((res: any) => {
    });
    http.expectOne({ method: 'POST', url: 'https://cangular-api.herokuapp.com/books/owner' });
    
  });

  it('should create book on createBook', () => {
    const bookId = 'gatos';
    const mockResponse = mockBooks[0];
    service.getBookId(bookId).subscribe((res: any) => {
      expect(res.id).toEqual(mockResponse.id);
    });
});

});
