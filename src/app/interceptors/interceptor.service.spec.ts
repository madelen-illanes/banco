import { TestBed } from '@angular/core/testing';
import { InterceptorService} from "./interceptor.service";
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import{AuthService} from "../services/auth.service/auth.service";
import {environment} from "../../environments/environment";


describe('InterceptorService', () => {
  let httpTestingController: HttpTestingController;
  let URL = environment.api;
  let service: AuthService;
  let httpClient: HttpClient;

  let mockLoginService = {
    isLoggedIn: true,
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InterceptorService,
        { provide: AuthService, useValue: mockLoginService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: InterceptorService = TestBed.inject(InterceptorService);
    expect(interceptor).toBeTruthy();
  });


  it('Add Headers', () => {
    const URL = 'http://localhost:8000/product';
    const HEADERS = 'AUTHOR_ID';

    httpClient.get(URL).subscribe();

    let req = httpTestingController.expectOne(URL);
    let request = req.request.headers;

    expect(request.has(HEADERS)).toBeTruthy();
    expect(request.get(HEADERS)).toBe('0');

    httpTestingController.verify();
  });
});
