import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../../core/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly URL = environment.api
 
  constructor(private http: HttpClient) { }

  user = {
    userId: sessionStorage.getItem('userId'),
    username: sessionStorage.getItem('username')
  }

    sendCredentials(body:LoginUser): Observable<any>{
       return this.http.post<any>(`${this.URL}/users/login`, body)
      }

}
