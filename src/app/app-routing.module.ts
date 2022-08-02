import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { RegisterPageComponent } from './modules/register/pages/register-page/register-page.component';


const routes: Routes = [
  { path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(m =>m.AuthModule)
  },

  // { path: 'home',
  // component: HomePageComponent,
  // loadChildren: () => import('./modules/home/home.module').then(m =>m.HomeModule)
  // },

  { path: 'register',
  component: RegisterPageComponent,
  loadChildren: () => import('./modules/register/register.module').then(m =>m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
