import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { InputValueAcessorDirective } from '../../../../shared/directives/input-value-acessor.directive';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';




const mockResponse = {
  access_token: 'made',
  user: {
    username: 'made',
    userId: 'made'
  }
}

class mockAuthService {
  login() { return of(mockResponse) };
  checkUsernameExists() { return of({ exists: false }) }
}


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService
  let mockAuthServiceJest = {
    sendCredentials : jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent,
        InputValueAcessorDirective],

      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{provide: AuthService, userValue: mockAuthServiceJest }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });
  // useClass: mockAuthService

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    jest.resetAllMocks();
    fixture.detectChanges();


  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  })


// TODO: Debe asegurarse que el formulario es disabled si no ingresa correctamente los campos
it('should return invalid Form', () => {
// Arrange
const mockCredentials = {
  username: '',
  password: '1234',
}
//Act
component.formLogin.patchValue (
  {
  username: mockCredentials.username,
  password: mockCredentials.password
  }
)
//Assert
    expect(component.formLogin.disabled).toBeFalsy();
  });


  it('should request login form valid', () => {
    jest.spyOn(component.formLogin, 'markAllAsTouched');
    component.formLogin.patchValue({
      username: 'made',
      password: 'made1'
    });
    jest.spyOn(authService, 'sendCredentials').mockImplementation(() => of({exists: true}));
    component.sendLogin({
      username: 'made',
      password: 'made1',
    });

    expect(component.messageError).toEqual(undefined);
  });

});




