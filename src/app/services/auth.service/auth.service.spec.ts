import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';


import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let URL = environment.api;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
     
        HttpClientTestingModule       
      ],
    });
    httpController = TestBed.inject(HttpTestingController );
    service = TestBed.inject(AuthService);
  });
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('login user', () => {
    
    const mockBody ={
      username: '',
      password:'',
     
    }

    const mockResponse = {
      user: {
        userId: "w7qfsa5f21",
        username: "ksuarez"
    },
    access_token: "eyJhbG",
    tokenType: "Bearer" 
    }
   
    service.sendCredentials(mockBody)
    .subscribe()
    let url = URL + 'users/login'
    let req = httpController.expectOne(url)
    let request = req.request
    
    expect(
      request.method
    ).toBe('POST')
   
    
    req.flush(mockResponse)
  })
});