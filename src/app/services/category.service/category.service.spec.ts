import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { Books } from '../../core/books.interface';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;
  let URL = environment.api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should bring the get method', () => {
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
    ]

    const req = http.expectOne(`${URL}/books/owner`);
    expect(req.request.method).toBe("GET");
    req.flush(mockBooks);
  });
});
