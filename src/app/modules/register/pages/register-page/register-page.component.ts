import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
errorRegister: boolean = false
formRegister : FormGroup = new FormGroup ({})


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  
  this.authService. getAllCollection()
  .subscribe(response => {
    console.log('🍟', response);
  }
    ),



    this.formRegister = new FormGroup ({

    userName: new FormControl  ('',[
        Validators.required,
      ]),
    email: new FormControl  ('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl ('',[
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$")
    ]),
    confirmPassword: new FormControl ('',[
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$")
    ]),
    category: new FormControl ('',[
      Validators.required,
      Validators.min(3),
    ]),
    },
  
    )
  }
  sendRegister(): void {
    const {userName, email, password, confirmPassword} = this.formRegister.value
  this.authService.sendCredentialsRegister(userName,email,password,confirmPassword)
  .subscribe({
    next: res => {
    console.log('Sesión iniciada de manera correcta')
  },
  error:error => {
  this.errorRegister = true
  console.log('Error al ingresar usuario o contraseña')
  }
})

  
}

}
