import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Roles } from '@sn/shared/models';


@Component({
  selector: 'sn-admin-account-user-form',
  templateUrl: './account-user-form.component.html',
  styleUrls: ['./account-user-form.component.scss']
})
export class AccountUserFormComponent implements OnInit {
  public form: FormGroup;
  public Roles = Roles;

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as FormGroup;    
  }
}
