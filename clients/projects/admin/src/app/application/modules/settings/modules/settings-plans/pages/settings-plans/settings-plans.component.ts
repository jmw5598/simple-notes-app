import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Plan } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';

import * as plansSelectors from '@sn/admin/core/store/selectors';
import * as plansActions from '@sn/admin/core/store/actions';
import { PlansUpdateComponent } from '../../components/plans-update/plans-update.component';
import { PlansCreateComponent } from '../../components/plans-create/plans-create.component';
import { SnDrawerService } from '@sn/drawer';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-settings-plans',
  templateUrl: './settings-plans.component.html',
  styleUrls: ['./settings-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class SettingsPlansComponent implements OnInit {
  public allPlans$: Observable<Plan[]>;

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: SnDrawerService
  ) { }

  ngOnInit(): void {
    this.allPlans$ = this._store.select(plansSelectors.selectPlans);
  }

  public onEdit(plan: Plan): void {
    this._drawerService.show(PlansUpdateComponent, {
      data: plan
    });
  }

  public onCreate(): void {
    this._drawerService.show(PlansCreateComponent);
  }

  public onDelete(planId: number): void {
    this._store.dispatch(plansActions.deletePlan({ planId: planId }));   
  }

  public onUndelete(planId: number): void {
    this._store.dispatch(plansActions.undeletePlan({ planId: planId }));
  }
}
