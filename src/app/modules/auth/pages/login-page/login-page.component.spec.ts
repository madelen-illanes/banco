import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 // TODO: Debe asegurarse que el formulario es invalido si no ingresa correctamente los campos
  it('should return invalid Form', () => {

// Arrange

const mockCredentials = {
  userName: '',
  password: '1234',
}
const emailForm : any= component.formLogin.get('userName')
const passwordForm: any = component.formLogin.get('password')
//Act

emailForm.setValue(mockCredentials.userName)
passwordForm.setValue(mockCredentials.password)

//Assert

    expect(component.formLogin.invalid).toEqual(true);
  });



  
 //TODO: Debe asegurarse que el boton tiene la palabra "iniciar sesión", experiencia de usuario 
 it('should have the correct description', () => {
    
  const elementRef = fixture.debugElement.query(By.css('.form-action button'))
  const getInnerText = elementRef.nativeElement.innerText
  
      expect(getInnerText).toEqual('Iniciar sesión');
    });

});
  
  


