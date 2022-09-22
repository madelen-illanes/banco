import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree, } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad, CanActivate{

  constructor(
    private router:Router,
    private authService:AuthService){}

  canLoad(route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('canload', true);
    console.log(route);
    console.log(segments);
    if (!sessionStorage.getItem('access_token') || !sessionStorage.getItem('userId') || !sessionStorage.getItem('username')){
      this.router.navigate([''])
      return false
    }
      console.log('bloqueado por SessionGuard')
      return true;
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (!sessionStorage.getItem('access_token') || !sessionStorage.getItem('userId') || !sessionStorage.getItem('username')){
       this.router.navigate([''])
        return false
      }
        console.log('bloqueado por canActivate')
        return true;
  }

    // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   if (!sessionStorage.getItem('access_token') || !sessionStorage.getItem('userId') || !sessionStorage.getItem('username')) {
    //     this.router.navigateByUrl('/home');
    //     return false;
    //   }
    //   return true;
    // }

  //  // private authService:AuthService,
  // canActivate(): Observable<boolean> |  boolean {
  //   console.log('canActivate')
  //   return this.authService.validarToken()
  //    .pipe(
  //     tap(valid => {
  //       if(!valid){
  //         this.router.navigateByUrl('/auth/login')
  //       }
  //     })
  //    )
  // }

  // canLoad(): Observable<boolean> |  boolean {
  //   console.log('canLoad')
  //   return this.authService.validarToken()
  //   .pipe(
  //    tap(valid => {
  //      if(!valid){
  //        this.router.navigateByUrl('/public')
  //      }
  //    })
  //   )
  //   }
 }
