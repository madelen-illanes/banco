import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { environment } from '../../../../src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from '../../core/category.interface';

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
    http = TestBed.inject(HttpTestingController );
    service = TestBed.inject(CategoryService);
  });

  it('should bring the get method', (done) => {
    const mockCategory: Category []= [
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
      }
    ];
    service.getCategories().subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(mockCategory)
      done();
    });

    let url = URL + '/category'
    const req = http.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(mockCategory);
  });
});
