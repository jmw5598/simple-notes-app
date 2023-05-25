import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Role } from '@sn/shared/models';


@Component({
  selector: 'sn-admin-account-user-form',
  templateUrl: './account-user-form.component.html',
  styleUrls: ['./account-user-form.component.scss']
})
export class AccountUserFormComponent implements OnInit {
  public form: UntypedFormGroup;
  
  @Input()
  public roles: Role[]

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this._initializeForm(); 
  }

  private _initializeForm(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
    const rolesArray: UntypedFormArray = this.form?.get('user')?.get('roles') as UntypedFormArray;
    if (!rolesArray) return;
    this.roles?.forEach(role => {
      rolesArray.push(this._generateRoleCheckbox(role))
    });
  }

  private _generateRoleCheckbox(role: Role): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(role.id || -1),
      name: new UntypedFormControl(role.name || ''),
      isChecked: new UntypedFormControl(false)
    });
  }
}
