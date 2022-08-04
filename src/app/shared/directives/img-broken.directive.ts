import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg: string = ''

  constructor(private elHost: ElementRef) {
  }

  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement
    elNative.src = 'https://i.imgur.com/b4nJzV1.jpeg'
  }
}
