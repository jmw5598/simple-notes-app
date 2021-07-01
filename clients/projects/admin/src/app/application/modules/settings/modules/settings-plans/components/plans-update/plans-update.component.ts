import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRolesState } from '@sn/admin/core/store/reducers';
import { ResponseMessage } from '@sn/shared/models';
import { Observable } from 'rxjs';

import * as plansSelectors from '@sn/admin/core/store/selectors';
import { buildPlansForm } from '../plans-form/plans-form.builder';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-plans-update',
  templateUrl: './plans-update.component.html',
  styleUrls: ['./plans-update.component.scss'],
  animations: [showHide]
})
export class PlansUpdateComponent implements OnInit {
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
