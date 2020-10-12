import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'sn-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss']
})
export class CalendarEventFormComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
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

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }
}
