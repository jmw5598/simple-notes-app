import { Component, OnInit, AfterViewInit, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';
import { HEX_COLOR_STRING_ARRAY } from '../../defaults/colors.defaults';
import { fadeAnimation, showHide } from '@sn/shared/animations';
import { DEFAULT_DATE_TIME_PICKER_CONFIG } from '@sn/user/shared/defaults';
import { IDatePickerConfig } from 'ng2-date-picker';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sn-user-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss'],
  animations: [fadeAnimation, showHide],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnCalendarEventFormComponent implements OnInit, AfterViewInit {
  private readonly ENTER_KEY: number = 13;
  public form: UntypedFormGroup;
  public colors: string[] = HEX_COLOR_STRING_ARRAY;
  public isColorSwatchPickerShown: boolean = false;

  public datepickerConfig: IDatePickerConfig = {
    ...DEFAULT_DATE_TIME_PICKER_CONFIG
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
    this.form.get('color').patchValue(HEX_COLOR_STRING_ARRAY[0]);

    this.form.valueChanges
      .pipe(debounceTime(250))
      .subscribe(value => this._changeDetectorRef.markForCheck())
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    })
  }

  public reset(): void {
    this.form.reset();
    this.form.get('color').patchValue(HEX_COLOR_STRING_ARRAY[0]);
  }

  public showColorSwatchPicker(): void {
    this.isColorSwatchPickerShown = !this.isColorSwatchPickerShown;
  }

  public handleColorSwatchChange(color: any): void {
    color.$event.preventDefault();
  }

  public handleColorSwatchChangeComplete(color: any): void {
    color.$event.preventDefault();
    if (color.$event instanceof MouseEvent || color.$event.keyCode === this.ENTER_KEY) {
      this.isColorSwatchPickerShown = !this.isColorSwatchPickerShown;
      this.form.get('color').patchValue(color.color.hex);
    }
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }
}
