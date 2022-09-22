import { NgModule,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { InputValueAcessorDirective } from './directives/input-value-acessor.directive';



@NgModule({
  declarations: [
   
    HeaderUserComponent,
    ImgBrokenDirective,
    InputValueAcessorDirective,
    
  ],
  imports: [
    CommonModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports : [
  
    HeaderUserComponent,
    ImgBrokenDirective,
    InputValueAcessorDirective
  ]
})
export class SharedModule { }
