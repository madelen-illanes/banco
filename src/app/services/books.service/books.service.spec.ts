import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Books } from 'src/app/core/books.interface';
import { environment } from 'src/environments/environment';
import { BooksService } from './books.service';

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
    service = TestBed.inject(BooksService);
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

    const req = http.expectOne(`${URL}/books/owner`);
    expect(req.request.method).toBe("POST");
  });
});
