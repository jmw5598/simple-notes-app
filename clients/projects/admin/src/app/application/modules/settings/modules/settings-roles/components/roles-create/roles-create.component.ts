import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRolesState } from '@sn/admin/core/store/reducers';
import { ResponseMessage } from '@sn/shared/models';
import { Observable } from 'rxjs';

import * as rolesSelectors from '@sn/admin/core/store/selectors';
import { buildRolesForm } from '../roles-form/roles-form.builder';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.scss'],
  animations: [showHide]
})
export class RolesCreateComponent implements OnInit {
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<IRolesState>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.form = buildRolesForm(this._formBuilder);
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(rolesSelectors.selectCreateRoleResponseMessasge);
  }
}
