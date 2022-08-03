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
    elNative.src = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fs1.eestatic.com%2F2019%2F07%2F01%2Fcomo%2Flibros-estudiantes-universidad_410470522_127023888_1024x576.jpg&imgrefurl=https%3A%2F%2Fwww.elespanol.com%2Fcomo%2Fnormas-apa-citar-libro%2F410459759_0.html&tbnid=nwnXfkgk7AntWM&vet=12ahUKEwjxtcC866r5AhWKMd8KHQBQB1IQMyguegUIARDEAg..i&docid=Czf-XR4eoJBK5M&w=1024&h=576&q=imagen%20de%20libro&ved=2ahUKEwjxtcC866r5AhWKMd8KHQBQB1IQMyguegUIARDEAg'
  }
}
