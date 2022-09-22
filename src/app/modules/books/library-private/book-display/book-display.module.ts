import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDisplayRoutingModule } from './book-display-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookDisplayComponent } from './pages/book-display/book-display.component';



@NgModule({
  declarations: [
    BookDisplayComponent
  ],
  imports: [
    CommonModule,
    BookDisplayRoutingModule,
    SharedModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookDisplayModule { }
