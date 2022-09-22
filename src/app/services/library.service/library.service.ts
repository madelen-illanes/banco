import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterModel } from '../../core/models/register.model';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private readonly URL = environment.api
  

  constructor(private http: HttpClient) { }

  registerUser( body:RegisterModel): Observable<any>{
    return this.http.post<any>( `${this.URL}/users/`, body) 
  }

  existUserName(name: string):Observable<any>{ 
    return this.http.get<any>(`${this.URL}/users/exist-name/`+ name)

  }

  existEmail(email:string):Observable<any>{
    return this.http.get<any>( `${this.URL}/exist-email/`+ email)
  }
  
}
