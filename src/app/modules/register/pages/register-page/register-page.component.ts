import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { map, tap } from 'rxjs';
import { RegisterModel } from '../../../../core/models/register.model';
import { ValidationService } from '../../../../services/validation.service';
import { LibraryService } from '../../../../services/library.service/library.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
  

})
export class RegisterPageComponent implements OnInit {
  formRegister!: FormGroup;
  user !: RegisterModel;
  allCategories: any[] = [];
  selectedCategories: any [] = [];
  categories: Array<string> = ['Anime', 'Ciencia Ficción', 'Novelas', 'Dramas']
  categororyErrors: Boolean = true;
  userNameError!: Boolean;
  
  constructor(private formBuilder: FormBuilder,private libraryService: LibraryService ) {
    this.formRegister = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required], asyncValidators: [ verifyUserName(this.libraryService)], upDateOn: 'blur' } ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, 
        Validators.minLength(8), 
        Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,60})")]],
      confirmPassword: ['', Validators.required],
      category: this.addCategoriesControls()
    });
   }

  ngOnInit(): void {
   this.name;
   this.email;
   this.password;
   this.confirmPassword;
    
  }

  //Validaciones

  get name(): FormControl{
    return this.formRegister.get('name') as FormControl
    }

  get email(): FormControl {
    return this.formRegister.get('email') as FormControl
  }

  get password(): FormControl {
    return this.formRegister.get('password') as FormControl
  }

  get confirmPassword(): FormControl {
    return this.formRegister.get('confirmPassword') as FormControl
  }

  usernameErrorsControl(){
    this.name.setErrors({
      "exist": true,
      "nameExist": true
    })
    
  }
  emailErrorsControl(){
    this.email.setErrors({
      "exist": true
    })
  }
  passwordErrorsControl(){
    this.password.setErrors({
      "exist": true
    })
  }
  confirmPasswordErrorsControl(){
    this.confirmPassword.setErrors({
      "exist": true
    })
  }


  addCategoriesControls(){
    const arr = this.categories.map( (element:any)=> { 
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
   get categoriesArray(){
    return <FormArray>this.formRegister.get('category')
   }

   checkCategoriesControlTouched(){
    let flg = false;
    this.categoriesArray.controls.forEach((control: any)=>{
      if( control.touched){
        flg = true;
      }
    });
    return flg;
   }

   getSelectedCategories(){
    this.selectedCategories = [];
    this.categoriesArray.controls.forEach((control:any, i ) => {
      if(control.value) {
        this.selectedCategories.push(this.categories[i]);
       }
    });
    this.categororyErrors = this.selectedCategories.length > 2 ? false : true;

   }

   onSubmit(body:RegisterModel){
    const formValue = this.formRegister.getRawValue();
    const newCategory = this.selectedCategories;
    this.user= {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      category: {...newCategory}

    }
    if( !this.categororyErrors){
     
    this.libraryService.registerUser(this.user)
    .subscribe({
      next: res => {
        console.log('recibiendo respuesta', res)
                 
        }
    })
  }
    
  }
  
}
 // validate username:
 export function verifyUserName(libraryService:LibraryService):AsyncValidatorFn {
  return (control: AbstractControl) => { 
    return libraryService.existUserName(control.value) 
    .pipe(
      tap((a)=> {console.log('resp', a)}),
      map(
        (response:any) => ( response.exist ? { nameExist: true} : null)
      )
    )
  }
}