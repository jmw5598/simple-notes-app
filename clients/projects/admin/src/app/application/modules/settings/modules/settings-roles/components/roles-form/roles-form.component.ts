import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'sn-admin-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
  }
}
