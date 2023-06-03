import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeAnimation } from '@sn/shared/animations'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccountsState } from '../../store/reducers';
import { Account, Profile } from '@sn/shared/models';
import { selectAccountDetails, selectAccountProfile } from '../../store/selectors';

import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';

@Component({
  selector: 'sn-user-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AccountSettingsComponent extends AbstractPageOverlayLoader implements AfterViewInit {  
  public accountProfile$: Observable<Profile>;
  public accountDetails$: Observable<Account>;

  public currentRoute: string = 'general';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<IAccountsState>,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this._selectState();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._handleActiveTabRestore();
  }

  public navigateTo(route: string): void {
    this.currentRoute = route;
    console.log("this touer it ", route)
    this._router.navigateByUrl(`/accounts/settings/${route}`);
  }

  private _selectState(): void {
    this.accountProfile$ = this._store.select(selectAccountProfile);
    this.accountDetails$ = this._store.select(selectAccountDetails);
  }

  private _handleActiveTabRestore(): void {
    // setTimeout(() => {
    //   const currentTab: UrlSegment = this._route.firstChild.snapshot.url[0];
    //   const tab = this.tabs?.tabs?.find(e => e.id === currentTab.path.toLowerCase());
    //   if (tab) {
    //     tab.active = true;
    //   }
    // });
  }
}
