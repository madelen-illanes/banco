import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderUserComponent,
    ImgBrokenDirective
  ],
  imports: [
    CommonModule,
  ],
  exports : [
    NavbarComponent,
    HeaderUserComponent,
    ImgBrokenDirective
  ]
})
export class SharedModule { }
