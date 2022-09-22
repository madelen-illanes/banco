import { NgModule} from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SessionGuard } from './guards/guards/session.guard';
import { AddbookComponent } from './modules/books/library-private/add-book/pages/addbook/addbook.component';
import { BookDisplayComponent } from './modules/books/library-private/book-display/pages/book-display/book-display.component';

import { HomePageComponent } from './modules/books/library-private/home/pages/home-page/home-page.component';
import { PublicLibraryComponent } from './modules/books/library-public/public-library/pages/public-library/public-library.component';
import { RegisterPageComponent} from './modules/register/pages/register-page/register-page.component';



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    //canLoad:  [SessionGuard],
    //  canActivate : [SessionGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
    // canLoad:  [SessionGuard],
    // canActivate : [SessionGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () => import('./modules/books/library-private/home/home.module').then(m => m.HomeModule),
    // canLoad:  [SessionGuard],
    canActivate : [SessionGuard],
    
  },
  {
    path: 'public',
    component: PublicLibraryComponent,
    loadChildren: () => import('./modules/books/library-public/public-library/public-library.module').then(m => m.PublicLibraryModule),
    //canLoad:  [SessionGuard],
    canActivate : [SessionGuard],
   
  },
 
  {
    path: 'books',
    children: [
      {
        path: 'add',
        component: AddbookComponent,
        loadChildren: () => import('./modules/books/library-private/add-book/add-book.module').then(m => m.AddBookModule),
      
      },
      {
        path: 'display/:id',
        component: BookDisplayComponent,
        loadChildren: () => import('./modules/books/library-private/book-display/book-display.module').then(m => m.BookDisplayModule),
      
      },
      {
        path: 'edit/:id',
        component: AddbookComponent,
        loadChildren: () => import('./modules/books/library-private/add-book/add-book.module').then(m => m.AddBookModule),
       
      },
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
