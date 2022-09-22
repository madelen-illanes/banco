import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterPageComponent } from './register-page.component';
import { LibraryService } from '../../../../services/library.service/library.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksService } from 'src/app/services/books.service/books.service';
import { Category } from 'src/app/core/category.interface';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { InputValueAcessorDirective } from '../../../../shared/directives/input-value-acessor.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockCategories: Category[] = [
  {
    id: 1,
    description: 'test1'
  },
  {
    id: 2,
    description: 'test2'
  },
  {
    id: 3,
    description: 'test3'
  }
]


describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let libraryService: LibraryService;
  let authService: AuthService

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent,
        InputValueAcessorDirective],
      imports: [      
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule  
        
      ],
      providers: [{provide: AuthService}, 
        {provide:LibraryService }],  
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    libraryService = TestBed.inject(LibraryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  })

// TODO: Debe asegurarse que el formulario es invalido si no ingresa correctamente los campos
it('should return invalid Form', () => {

  // Arrange
  
  const mockCredentials = {
    name: '',
    email: 'prueba@123.com',
    password: '1234',
    confirmPassword: '1234',
    category: []

  }
  //Act
  component.formRegister.patchValue ( 
    {
    name: mockCredentials.name,
    email: mockCredentials.email,
    password: mockCredentials.password,
    confirmPassword: mockCredentials.confirmPassword,
    category: mockCredentials.category
    }
  ) 
  
  //Assert
  
      expect(component.formRegister.disabled).toBeFalsy();
    });
  

    it('should create user onRegister or mark touched based on valid', () => {
      component.formRegister.patchValue({
        name: 'test',
        email: 'test',
        password: 'Testing_1',
        passwordConfirm: 'Testing_123',
        categories: {
          [mockCategories[0].id]: true,
          [mockCategories[1].id]: true,
          [mockCategories[2].id]: true,
        }
      });
      component.onSubmit;
      expect(component.formRegister.touched).toBe(true);
  
      jest.spyOn(libraryService, 'registerUser');
      component.formRegister.patchValue({
        name: 'test',
        email: 'test',
        password: 'Testing_1',
        passwordConfirm: 'Testing_1',
        categories: {
          [mockCategories[0].id]: true,
          [mockCategories[1].id]: true,
          [mockCategories[2].id]: true,
        }
      });
      component.onSubmit;
      expect(libraryService.registerUser).toHaveBeenCalled();
    });

  });