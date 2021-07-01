import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRolesState } from '@sn/admin/core/store/reducers';
import { Plan, ResponseMessage } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';

import * as plansSelectors from '@sn/admin/core/store/selectors';
import * as plansActions from '@sn/admin/core/store/actions';
import { buildPlansForm } from '../plans-form/plans-form.builder';
import { showHide } from '@sn/shared/animations';
import { DrawerService } from '@sn/shared/components';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'sn-admin-plans-update',
  templateUrl: './plans-update.component.html',
  styleUrls: ['./plans-update.component.scss'],
  animations: [showHide]
})
export class PlansUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  private _data$: Observable<Plan>;

  constructor(
    private _store: Store<IRolesState>,
    private _drawerService: DrawerService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
    this._listenForDrawerDataChanges();
  }

  public close(): void {
    this._drawerService.close();
  }

  public submit(plan: Plan): void {
    this._store.dispatch(plansActions.updatePlan({
      planId: plan.id,
      plan: plan
    }));
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(plansSelectors.selectUpdatePlanResponseMessasge)
      .pipe(tap(message => {
        if (message) {
          setTimeout(() => this._store.dispatch(plansActions.setUpdatePlanResponseMessage({ message: null })), 3000);
        }
      }));
    this._data$ = this._drawerService.onDataChange();
  }

  private _initializeForm(): void {
    this.form = buildPlansForm(this._formBuilder);
  }

  private _listenForDrawerDataChanges(): void {
    this._data$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => this.form.patchValue({ ...data }));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
