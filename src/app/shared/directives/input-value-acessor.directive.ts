import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appInputAcessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputValueAcessorDirective),
      multi: true,
    },
  ],

})
export class InputValueAcessorDirective
  implements ControlValueAccessor, OnInit
{

  @Input() controlState: boolean = true;
  @HostBinding('value') hostValue: any;
  @HostBinding('state') hostState: string | undefined;

  private lastValue: any;

  constructor(private elementRef:ElementRef) { }
  ngOnInit() {
    this.hostState = this.elementRef.nativeElement.state;
  }

  writeValue(value: any) {
    this.hostValue = this.lastValue = value == null ? '' : value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }


  private onChange = (value: any) => {};

  private onTouched = () => {};

  private checkClassList(classList: any) {
    if (classList.contains('ng-invalid')) {
      return 'error';
    } else {
      return 'normal';
    }
  }

  private shouldBlockOnMaxLength(element: ElementRef, value: number | string) {
    const maxLength = element.nativeElement.maxLength;
    const elementType = element.nativeElement.type;
    const shouldBlockElement = elementType === 'number';
    return (
      shouldBlockElement && maxLength && value.toString().length >= maxLength
    );
  }

  private isAllowedKeyCode(keyCode: string) {
    const allowedKeyCodes = [
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
      'Shift',
      'Home',
      'End',
      'Tab',
      'Enter',
    ];
    return allowedKeyCodes.indexOf(keyCode) >= 0;
  }

  private cancelEvent(e: Event) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  @HostListener('iblur', ['$event.detail'])
  _handleInputBlurEvent(value: any) {
    this.onTouched();
    if (this.controlState)
      this.hostState = this.checkClassList(
        this.elementRef.nativeElement.classList
      );
  }


  @HostListener('ichange', ['$event.target.shadowRoot.activeElement.value'])
  _handleInputEvent(value: any) {
    if (JSON.stringify(value) !== JSON.stringify(this.lastValue)) {
      this.lastValue = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  @HostListener('keydown', ['$event'])
  _handleKeyDownEvent(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (
      this.shouldBlockOnMaxLength(this.elementRef, value) &&
      !this.isAllowedKeyCode(event.code)
    ) {
      this.cancelEvent(event);
    }
  }

  @HostListener('keyup', ['$event'])
  _handleKeyUpEvent() {
    if (this.controlState) {
      this.hostState = this.checkClassList(
        this.elementRef.nativeElement.classList
      );
    }
  }

  @HostListener('paste', ['$event'])
  _handlePasteEvent(event: ClipboardEvent) {
    if (!event.clipboardData) return;
    if (
      this.shouldBlockOnMaxLength(
        this.elementRef,
        event.clipboardData.getData('text/plain')
      )
    ) {
      this.cancelEvent(event);
    }
  }
}
