import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { HEX_COLOR_STRING_ARRAY } from '../../defaults/colors.defaults';

@Component({
  selector: 'sn-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss']
})
export class CalendarEventFormComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public colors: string[] = HEX_COLOR_STRING_ARRAY;
  public isColorSwatchPickerShown: boolean = false;
  public selectedHexColor: string = HEX_COLOR_STRING_ARRAY[0];

  public datepickerConfig = { 
    adaptivePosition: true, 
    containerClass: 'theme-blue',
    isAnimated: true
  };

  constructor(
    private _renderer: Renderer2,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    })
  }

  public reset(): void {
    console.log("resetting form?");
    this.form.reset();
  }

  public showColorSwatchPicker(): void {
    this.isColorSwatchPickerShown = !this.isColorSwatchPickerShown;
  }

  public handleColorSwatchChange(color: any): void {
    console.log(color);
    this.selectedHexColor = color.color.hex;
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }
}
