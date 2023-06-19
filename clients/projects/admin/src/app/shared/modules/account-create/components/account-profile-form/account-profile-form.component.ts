import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'sn-admin-account-profile-form',
  templateUrl: './account-profile-form.component.html',
  styleUrls: ['./account-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountProfileFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;    
  }
}
