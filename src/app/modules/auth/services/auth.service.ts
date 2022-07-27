import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
 

  constructor(private http: HttpClient) { }

  getAllCollection(): Observable<any>{
    return this.http.get(`${this.URL}/category`)
  }

  sendCredentialsRegister(userName:string, email:string, password:string,confirmPassword:string ): Observable<any>{
    const  body = {
    userName, email, password, confirmPassword
    }
  
     return this.http.post(`${this.URL}/users/`,body)
    }

    sendCredentials(userName:string, password:string): Observable<any>{
      const  body = {
       userName, password
      }
    
       return this.http.post(`${this.URL}/users/login`,body)
      }

}
