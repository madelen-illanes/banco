import { HttpClientTestingModule} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BooksService } from '../../../../../../services/books.service/books.service';
import { InputValueAcessorDirective } from '../../../../../../shared/directives/input-value-acessor.directive';

import { AddbookComponent } from './addbook.component';

window.alert = jest.fn();

  class mockBooksService {
  createAbook() { return of(true) }
}


describe('AddbookComponent', () => {
  let component: AddbookComponent;
  let fixture: ComponentFixture<AddbookComponent>;
  let booksService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbookComponent,
        InputValueAcessorDirective
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      
      ],
      providers: [{provide: BooksService, useClass: mockBooksService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbookComponent);
    component = fixture.componentInstance;
    jest.resetAllMocks();
    booksService= TestBed.inject(BooksService);
    fixture.detectChanges();

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AddbookComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  })



});
