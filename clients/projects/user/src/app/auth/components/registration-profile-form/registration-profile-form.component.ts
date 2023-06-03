import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'sn-user-registration-profile-form',
  templateUrl: './registration-profile-form.component.html',
  styleUrls: ['./registration-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationProfileFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }
}
