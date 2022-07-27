import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorLogin: boolean = false
  formLogin: FormGroup = new FormGroup ({})

  constructor(private authService:AuthService) { }
  

  ngOnInit(): void {
    this.formLogin = new FormGroup ({
    email: new FormControl  ('',[
      Validators.required,
      Validators.email,
    ]
    ),
    password: new FormControl ('',[
      Validators.required,
      Validators.minLength(8),
    ]
    ),
    }
    )
  }
 
  sendLogin(): void {
    const {email,password} = this.formLogin.value
  this.authService.sendCredentials(email, password)
  .subscribe(responseOk => {
    console.log('Sesión iniciada de manera correcta')
  },
  err => {
  this.errorLogin = true
  console.log('Error al ingresar usuario o contraseña')
  })
  } 
}
