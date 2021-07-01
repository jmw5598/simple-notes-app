import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IRolesState } from '@sn/admin/core/store/reducers';
import { showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/shared/models';

import * as plansSelectors from '@sn/admin/core/store/selectors';
import { buildPlansForm } from '../plans-form/plans-form.builder';

@Component({
  selector: 'sn-admin-plans-create',
  templateUrl: './plans-create.component.html',
  styleUrls: ['./plans-create.component.scss'],
  animations: [showHide]
})
export class PlansCreateComponent implements OnInit {
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

  private _selectState(): void {
    this.responseMessage$ = this._store.select(plansSelectors.selectUpdatePlanResponseMessasge);
  }

  private _initializeForm(): void {
    this.form = buildPlansForm(this._formBuilder);
  }
}
