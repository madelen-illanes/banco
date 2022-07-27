import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlCollection = 'https://cangular-api.herokuapp.com'


  constructor(private http: HttpClient) { }

  sendCredentials(email:string, password:string): Observable<any>{
  const  body = {
   email, password
  }

   return this.http.post(`${this.urlCollection}/auth/login`,body)
  }
}
