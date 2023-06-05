import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type SnRadioShape = 
  | 'square' 
  | 'rounded' 
  | 'circle';

export type SnRadioLabelPosition = 
  | 'left' 
  | 'right';

export type SnRadioColor = 
  | 'primary' 
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type SnRadioSize = 
  | 'small'
  | 'medium'
  | 'large'
  | 'xsmall';

@Component({
  selector: 'sn-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SnRadioComponent),
      multi: true
    }
  ]
})
export class SnRadioComponent implements ControlValueAccessor {
  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public labelPosition: SnRadioLabelPosition;

  @Input()
  public shape: SnRadioShape;

  @Input()
  public size: SnRadioSize;

  @Input()
  public color: SnRadioColor;

  @Input()
  public disabled: boolean;

  private _value: string | number | boolean;

  @Input()
  public set value(value: string | number | boolean) {
    if (!this.disabled) {
      this._value = value;
      this.innerValue = value;
      this.onChange(value);
      // this.onTouched(value);
    }
  }

  // set value(v: string | number | boolean) {
  //   if (v !== this.innerValue) {
  //     this.innerValue = v;
  //     this.change(v);
  //   }
  // }


  public get value(): any {
    return this._value;
  }

  public innerValue: any = '';
  public onChange: any = () => {};
  public onTouch: any = () => {};

  constructor() {
    this.labelPosition = 'right';
    this.shape = 'circle';
    this.size = 'small';
    this.color = 'primary';
    this.disabled = false;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(value: string | number | boolean): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public toggleChecked(): void {
    if (!this.disabled) {
      this.innerValue = this.innerValue === this.value ? null : this.value;
      this.onChange(this.innerValue);
      // this.onTouched(this.innerValue);
    }
  }

  public get classes(): string {
    return `${this.labelPosition} ${this.shape} ${this.size}`;
  }

  change(value: string | number | boolean) {
    console.log(this.onChange);
    this.innerValue = value;
    this.onChange(value);
    
  }
}
