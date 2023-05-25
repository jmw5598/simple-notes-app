import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';
import { State, STATES } from '@sn/user/shared/data';

@Component({
  selector: 'sn-user-registration-address-form',
  templateUrl: './registration-address-form.component.html',
  styleUrls: ['./registration-address-form.component.scss']
})
export class RegistrationAddressFormComponent implements OnInit {
  public form: UntypedFormGroup;
  public states: State[]; 

  constructor(private _parentControl: ControlContainer) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup
  }
}
