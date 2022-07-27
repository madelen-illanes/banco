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
    userName: new FormControl  ('',[
      Validators.required,
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
    const {userName,password} = this.formLogin.value
  this.authService.sendCredentials(userName, password)
  .subscribe({
    next: res => {
    console.log('Sesión iniciada de manera correcta')
  },
  error:error => {
  this.errorLogin = true
  console.log('Error al ingresar usuario o contraseña')
  }
})
  } 
}
