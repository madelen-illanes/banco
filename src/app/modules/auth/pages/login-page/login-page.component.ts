import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service/auth.service';
import {Router} from '@angular/router';
import {LoginUser} from '../../../../core/login.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // errorLogin: boolean = false
  loginuser!: LoginUser;
  messageError: undefined;
  formLogin!: FormGroup

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {

    this.formLogin = this.fb.group({
      username: [null, [Validators.required,]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
      ]],
    })
  }

  ngOnInit(): void {

  }


//Validaciones
  get password(): FormControl {
    return this.formLogin.get('password') as FormControl
  }

  get username(): FormControl {
    return this.formLogin.get('username') as FormControl
  }


  // setErrorPassword() {
  //   this.password.setErrors({
  //     "exist": true
  //   })
  // }

  // errorUserNameLogin() {
  //   if (this.username!.errors && this.username!.errors['required']) {
  //     return 'Usuario es requerido';
  //   } else {
  //     return 'Usuario no existe'
  //   }
  // }

  sendLogin(user: LoginUser) {
    const formValue = this.formLogin.getRawValue();
    this.loginuser = {
      username: formValue.username,
      password: formValue.password,
    }

    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched()
      return;
    }

    this.authService.sendCredentials(this.loginuser)
      .subscribe(resp =>{
        sessionStorage.setItem('access_token', resp.access_token);
        sessionStorage.setItem('tokenType', resp.tokenType);
        sessionStorage.setItem('userId', resp.user.userId)
        sessionStorage.setItem('username', resp.user.username)
        this.authService.user = resp.user;
        this.router.navigateByUrl('/public')
        console.log('resp', resp);
      });
      // .subscribe({
      //   next: (res: { access_token: string; userId: string; username: string;
      //     user: { userId: string | null; username: string | null; }; }) => {
      //     console.log('recibiendo la respuesta', res)
      //     sessionStorage.setItem('access_token', res.access_token)
      //     sessionStorage.setItem('userId', res.userId)
      //     sessionStorage.setItem('username', res.username)
      //     this.authService.user = res.user;
      //     this.router.navigateByUrl('/public')
      //   },
      //   error: (error: { message: undefined; }) => {
      //     this.messageError = error.message
      //   }
      // })
  }


//   sendLogin(): void {
//     const {userName,password} = this.formLogin.value
//   this.authService.sendCredentials(this.loginuser)
//   .subscribe({
//     next: res => {
//     console.log('Sesión iniciada de manera correcta')
//   },
//   error:error => {
//   this.errorLogin = true
//   console.log('Error al ingresar usuario o contraseña')
//   }
// })
// }
}
