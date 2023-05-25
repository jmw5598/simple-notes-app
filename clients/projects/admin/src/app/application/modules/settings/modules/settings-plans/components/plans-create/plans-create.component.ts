import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IRolesState } from '@sn/admin/core/store/reducers';
import { showHide } from '@sn/shared/animations';
import { Plan, ResponseMessage } from '@sn/shared/models';

import * as plansSelectors from '@sn/admin/core/store/selectors';
import * as plansActions from '@sn/admin/core/store/actions';
import { buildPlansForm } from '../plans-form/plans-form.builder';
import { DrawerService } from '@sn/shared/components';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sn-admin-plans-create',
  templateUrl: './plans-create.component.html',
  styleUrls: ['./plans-create.component.scss'],
  animations: [showHide]
})
export class PlansCreateComponent implements OnInit {
  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<IRolesState>,
    private _drawerService: DrawerService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
  }

  public submit(plan: Plan): void {
    this._store.dispatch(plansActions.createPlan({
      plan: plan
    }));
  }

  public close(): void {
    this._drawerService.close();
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(plansSelectors.selectCreatePlanResponseMessasge)
      .pipe(tap(message => {
        if (message) {
          setTimeout(() => this._store.dispatch(plansActions.setCreatePlanResponseMessage({ message: null })), 3000);
        }
      }));
  }

  private _initializeForm(): void {
    this.form = buildPlansForm(this._formBuilder);
  }
}
