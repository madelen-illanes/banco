import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDisplayRoutingModule } from './book-display-routing.module';
import { BookDisplayComponent } from './pages/book-display/book-display.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BookDisplayComponent
  ],
  imports: [
    CommonModule,
    BookDisplayRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class BookDisplayModule { }
