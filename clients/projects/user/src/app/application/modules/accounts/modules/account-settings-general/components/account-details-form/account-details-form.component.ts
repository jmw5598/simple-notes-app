import { Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';
import { fadeAnimation } from '@sn/shared/animations';
import { STATES } from '@sn/user/shared/data';

@Component({
  selector: 'sn-user-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss'],
  animations: [fadeAnimation]
})
export class AccountDetailsFormComponent implements OnInit {
  public form: UntypedFormGroup;
  public states = STATES;
  
  constructor(
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }
}
