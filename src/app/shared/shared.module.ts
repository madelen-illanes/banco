import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderUserComponent,
    SectionGenericComponent
  ],
  imports: [
    CommonModule,
  ],
  exports : [
    NavbarComponent,
    HeaderUserComponent
  ]
})
export class SharedModule { }
