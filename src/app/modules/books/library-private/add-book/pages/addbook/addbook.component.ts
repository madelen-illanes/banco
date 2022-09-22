import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from '../../../../../../services/books.service/books.service';
import { CategoryService } from '../../../../../../services/category.service/category.service';
import { Books } from '../../../../../../core/books.interface';
import { Category } from '../../../../../../core/category.interface';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
books: Books [] = []
categories: Category[] = [];
formBooks!: FormGroup
categories$: Observable<Category[]>

constructor(
private formBuilder: FormBuilder,
private categoryService: CategoryService,
private router: Router,
private routerActive: ActivatedRoute,
private booksService: BooksService) { 
  this.categories$ = this.categoryService.getCategories()

this.formBooks= this.formBuilder.group({
  title:  [null, Validators.required],
  author: [null, Validators.required],
  resume: [null, Validators.required],
  image:  [null, Validators.required],
  url:    [null, Validators.required],
  public: [false, Validators.required],
  
 
});

}
  ngOnInit(): void {
    this.routerActive.params.subscribe((id: Params) => {
     
    })
      }
     //console.log(id)    

get title(): FormControl {
  return this.formBooks.get('title') as FormControl

}
get author(): FormControl {
  return this.formBooks.get('author') as FormControl
}
get resume () : FormControl  {
  return this.formBooks.get('resume') as FormControl
}
get image() { return this.formBooks.get('image') };

get url () : FormControl  {
  return this.formBooks.get('url') as FormControl
}
get public () : FormControl  {
  return this.formBooks.get('public') as FormControl
}
get category () : FormControl  {
  return this.formBooks.get('category') as FormControl
}

addBook() {
const valueForm =  this.formBooks.getRawValue();
this.booksService.createAbook(valueForm)
  .subscribe({
    next: res => {
     
      alert('Libro Agregado')
    this.router.navigate(['/home'])
    },
    error: error => {
      alert('Error al añadir los datos')
    }
  })
  this.formBooks.reset()
}

 // console.log(res, '✔')
//errores
titleErrorsControl(){
  this.title.setErrors({
    "exist": true,
  })
  
}
urlErrorsControl(){
  this.url.setErrors({
    "exist": true
  })
}
resumeErrorsControl(){
  this.resume.setErrors({
    "exist": true
  })
}
authorErrorsControl(){
  this.author.setErrors({
    "exist": true
  })
}

}
