import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Role } from '@sn/shared/models';


@Component({
  selector: 'sn-admin-account-user-form',
  templateUrl: './account-user-form.component.html',
  styleUrls: ['./account-user-form.component.scss']
})
export class AccountUserFormComponent implements OnInit {
  public form: FormGroup;
  
  @Input()
  public roles: Role[]

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this._initializeForm(); 
  }

  private _initializeForm(): void {
    this.form = this._controlContainer.control as FormGroup;
    const rolesArray: FormArray = this.form?.get('user')?.get('roles') as FormArray;
    if (!rolesArray) return;
    this.roles?.forEach(role => {
      rolesArray.push(this._generateRoleCheckbox(role))
    });
  }

  private _generateRoleCheckbox(role: Role): FormGroup {
    return new FormGroup({
      id: new FormControl(role.id || -1),
      name: new FormControl(role.name || ''),
      isChecked: new FormControl(false)
    });
  }
}
