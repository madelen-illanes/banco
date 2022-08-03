import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddbookComponent } from './pages/addbook/addbook.component';


@NgModule({
  declarations: [
    AddbookComponent
  ],
  imports: [
    CommonModule,
    AddBookRoutingModule
  ]
})
export class AddBookModule { }
