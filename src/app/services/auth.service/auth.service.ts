import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { LoginUser } from '../../core/login.interface';
import { LoginResponse } from '../../core/user.interface';
import { UserInfo } from '../../core/user.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly URL = environment.api
  userInfo!: UserInfo
  accesstoken = localStorage.getItem("access_token")
  constructor(private http: HttpClient) { }
   
  user = {
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username')
  }

    sendCredentials(body:LoginUser): Observable<any>{
       return this.http.post<LoginResponse>(`${this.URL}/users/login`, body)
       
      }

validarToken(): Observable<boolean>{
  const url= `${this.URL}/users/login`;
  const headers = new HttpHeaders ()
  .set ('access_token', localStorage.getItem('access_token') || '');
  return this.http.get<LoginResponse> (url, {headers})
  .pipe(
    map(res => {
      return res.status;
    }),
    catchError(err =>of(false))
  )
}
 

}
