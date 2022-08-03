import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = sessionStorage.getItem('access_token')
    const newReq = req.clone({
      setHeaders: {
      Authorization: `Bearer ${access_token}`,
      },
    });
    return next.handle(newReq);
  }
}
