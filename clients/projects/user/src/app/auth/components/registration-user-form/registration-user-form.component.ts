import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'sn-user-registration-user-form',
  templateUrl: './registration-user-form.component.html',
  styleUrls: ['./registration-user-form.component.scss']
})
export class RegistrationUserFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }
}
