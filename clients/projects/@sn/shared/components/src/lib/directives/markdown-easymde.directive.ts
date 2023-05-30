import { Directive, ElementRef, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import easymde from 'easymde';
import * as EasyMDE from 'easymde';

@Directive({
  selector: 'textarea[snMarkdownEasymde]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEasymdeDirective),
      multi: true,
    },
  ],
})
export class MarkdownEasymdeDirective implements OnDestroy, ControlValueAccessor {
  @Input()
  public options!: EasyMDE.Options;

  public editor!: EasyMDE;

  constructor(private _elementRef: ElementRef) {
    this._initializeEasyMde();
  }

  public onChange: any = () => {};
  public onTouch: any = () => {};
  public disabled: boolean = false;

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(value: string): void {
    this.editor.value(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  ngOnChanges(): void {
    console.log('Changes runnign');
  }

  private _initializeEasyMde(): void {
    this.editor = new easymde({ 
      element: this._elementRef.nativeElement 
    } as EasyMDE.Options);

    this.editor.codemirror.on('change', () => {
      this.onChange(this.editor.value());
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.cleanup();
    }
  }
}
