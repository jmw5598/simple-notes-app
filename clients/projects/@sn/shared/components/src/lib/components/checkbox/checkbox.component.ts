import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type CheckboxShape = 
  | 'square' 
  | 'rounded' 
  | 'circle';

export type CheckboxLabelPosition = 
  | 'left' 
  | 'right';

export type CheckboxColor = 
  | 'primary' 
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export type CheckboxSize = 
  | 'small'
  | 'medium'
  | 'large'
  | 'xsmall';

@Component({
  selector: 'sn-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public labelPosition: CheckboxLabelPosition;

  @Input()
  public shape: CheckboxShape;

  @Input()
  public size: CheckboxSize;

  @Input()
  public color: CheckboxColor;

  @Input()
  public disabled: boolean;

  @Input()
  public set value(isChecked: boolean) {
    if (!this.disabled) {
      this.isChecked = isChecked;
      this.onChange(isChecked);
    }
  }

  public isChecked: boolean = false;
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

  public writeValue(checked: boolean): void {
    this.isChecked = checked;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public toggleChecked(): void {
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.onChange(this.isChecked);
    }
  }

  public get classes(): string {
    return `${this.labelPosition} ${this.shape} ${this.size}`;
  }
}
