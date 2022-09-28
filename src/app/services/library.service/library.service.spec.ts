import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExistsUserResponse } from '../../core/user.interface';
import { environment } from '../../../environments/environment';

import { LibraryService } from './library.service';
import { RegisterModel } from '../../core/models/register.model';
import {RegisterPageComponent} from "../../modules/register/pages/register-page/register-page.component";

describe('LibraryService', () => {
  let service: LibraryService;
  let http: HttpTestingController;
  let URL = environment.api

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ]
    });

    http = TestBed.inject(HttpTestingController );
    service = TestBed.inject(LibraryService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should request UsernameExist', () => {
    const mockResponse: ExistsUserResponse =
    {
      exists: false
    };
    service.existUserName('usuario').subscribe(res => {
      expect(res.exists).toBeTruthy();
      expect(res).toEqual(mockResponse);
    });
    let url = URL + '/users/exist-name/'
    const req = http.expectOne(url + 'usuario');
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });


  it('should request user creation on createUser', () => {
    const mockUser: RegisterModel =
    {
      name: 'user1',
      email: 'user1',
      password: 'user1',
      category: []
    };
    const mockResponse = {
      id: 'prueba123',
      status: 'success'
    }
    service.registerUser(mockUser).subscribe((res: any) => {
      expect(res.id).toBe('prueba123');
      expect(res.status).toBe('success');
    });
    let url = URL + '/users/'
    const req = http.expectOne(url);
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });


  it('should request UsernameExist', () => {
    const mockResponse: ExistsUserResponse =
    {
      exists: false
    };
    service.existEmail('usuario').subscribe(res => {
      expect(res.exists).toBeTruthy();
      expect(res).toEqual(mockResponse);
    });
    let url = URL + '/exist-email/'
    const req = http.expectOne(url + 'usuario');
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });
});
