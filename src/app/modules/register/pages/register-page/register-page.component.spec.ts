import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
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
  const emailForm : any= component.formRegister.get('userName')
  const passwordForm: any = component.formRegister.get('password')
  //Act
  
  emailForm.setValue(mockCredentials.userName)
  passwordForm.setValue(mockCredentials.password)
  
  //Assert
  
      expect(component.formRegister.invalid).toEqual(true);
    });
  
  

  });