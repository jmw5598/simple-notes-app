import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Plan } from '@sn/shared/models';

@Component({
  selector: 'sn-user-registration-account-form',
  templateUrl: './registration-account-form.component.html',
  styleUrls: ['./registration-account-form.component.scss']
})
export class RegistrationAccountFormComponent implements OnInit {
  @Input()
  public plans: Plan[];
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}