import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLibraryRoutingModule } from './public-library-routing.module';
import { PublicLibraryComponent } from './pages/public-library/public-library.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PublicLibraryComponent
  ],
  imports: [
    CommonModule,
    PublicLibraryRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicLibraryModule { }
