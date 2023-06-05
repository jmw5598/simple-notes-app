import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAccountsState } from '../../store/reducers';
import * as accountsSelectors from '../../store/selectors';
import * as accountsActions from '../../store/actions';

import { DEFAULT_SEARCH_ACCOUNTS_PAGE } from '@sn/admin/core/defaults';

import { fadeAnimation } from '@sn/shared/animations';
import { IPageable, Page, PageableSearch, Account } from '@sn/shared/models';
import { AccountCreateComponent } from '@sn/admin/shared/components';
import { AccountUpdateComponent } from '../../components/account-update/account-update.component';

import { SnDrawerLocation, SnDrawerService, SnDrawerSize } from '@sn/drawer';

@Component({
  selector: 'sn-admin-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnDrawerService],
  animations: [fadeAnimation]
})
export class ViewAccountsComponent implements OnInit {
  public DrawerLocation = SnDrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_ACCOUNTS_PAGE;

  public searchAccountsResult$: Observable<Page<Account>>;
  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<IAccountsState>,
    private _drawerService: SnDrawerService,
  ) { }

  ngOnInit(): void {
    this._selectState();
  }
  public onSearchTopics(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(accountsActions.searchAccounts({ search: topicSearch }));
  }

  public onDelete(id: number): void {
    this._store.dispatch(accountsActions.deleteAccount({ accountId: id }));
  }

  public onCreate(): void {
    this._drawerService.show(AccountCreateComponent, {
      size: SnDrawerSize.LARGE
    });
  }

  public onEdit(account: Account): void {
    this._drawerService.show(AccountUpdateComponent, {
      size: SnDrawerSize.LARGE,
      data: account
    });
  }

  public onGoToPage(pageable: IPageable): void {
    const topicSearch: PageableSearch = {
      searchTerm: this.searchTerm,
      pageable: pageable
    };
    this._store.dispatch(accountsActions.searchAccounts({ search: topicSearch }));
  }

  private _selectState(): void {
    this.searchAccountsResult$ = this._store.select(accountsSelectors.selectSearchAccountsResult);
  }

  ngOnDestroy() {
    this._store.dispatch(accountsActions.searchAccountsResult({ page: null }));
  }
}
