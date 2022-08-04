import { ComponentFixture, TestBed } from '@angular/core/testing';


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
  //Act
  component.formRegister.patchValue ( 
    {
    userName: mockCredentials.userName,
    password: mockCredentials.password
    }
  ) 
  
  //Assert
  
      expect(component.formRegister.invalid).toBeTruthy();
    });
  
  

  });