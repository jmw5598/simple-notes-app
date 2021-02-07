import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { fadeAnimation } from '@sn/shared/animations'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccountsState } from '../../store/reducers';
import { Account, Profile } from '@sn/core/models';
import { selectAccountDetails, selectAccountProfile } from '../../store/selectors';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';

@Component({
  selector: 'sn-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsComponent extends AbstractPageOverlayLoader implements OnInit, AfterViewInit {
  @ViewChild('tabs', { static: false })
  public tabs: TabsetComponent;

  public accountProfile$: Observable<Profile>;
  public accountDetails$: Observable<Account>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _store: Store<IAccountsState>,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this.accountProfile$ = this._store.select(selectAccountProfile);
    this.accountDetails$ = this._store.select(selectAccountDetails);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      const currentTab: UrlSegment = this._route.firstChild.snapshot.url[0];
      const tab = this.tabs?.tabs?.find(e => e.id === currentTab.path.toLowerCase());
      if (tab) {
        tab.active = true;
      }
    });
  }

  public navigateTo(route: string): void {
    this._router.navigateByUrl(`/accounts/settings/${route}`);
  }
}
