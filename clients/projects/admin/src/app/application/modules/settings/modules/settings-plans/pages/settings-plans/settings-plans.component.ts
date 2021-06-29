import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Plan } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';

import * as plansSelectors from '@sn/admin/core/store/selectors';

@Component({
  selector: 'sn-admin-settings-plans',
  templateUrl: './settings-plans.component.html',
  styleUrls: ['./settings-plans.component.scss']
})
export class SettingsPlansComponent implements OnInit {
  public allPlans$: Observable<Plan[]>;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.allPlans$ = this._store.select(plansSelectors.selectPlans);
  }
}
