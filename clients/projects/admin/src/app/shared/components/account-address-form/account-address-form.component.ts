import { Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

import { STATES, State } from '../../data';

@Component({
  selector: 'sn-admin-account-address-form',
  templateUrl: './account-address-form.component.html',
  styleUrls: ['./account-address-form.component.scss']
})
export class AccountAddressFormComponent implements OnInit {
  public form: UntypedFormGroup;
  public states: State[];

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
    this.states = STATES;
  }
}
