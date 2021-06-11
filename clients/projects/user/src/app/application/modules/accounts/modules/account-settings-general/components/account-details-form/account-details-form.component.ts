import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { fadeAnimation } from '@sn/user/shared/animations';
import { STATES } from '@sn/user/shared/data';

@Component({
  selector: 'sn-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss'],
  animations: [fadeAnimation]
})
export class AccountDetailsFormComponent implements OnInit {
  public form: FormGroup;
  public states = STATES;
  
  constructor(
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}
