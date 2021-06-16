import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAccountsState } from '../../store/reducers';
import * as accountsSelectors from '../../store/selectors';
import * as accountsActions from '../../store/actions';

import { DEFAULT_SEARCH_ACCOUNTS_PAGE } from '@sn/admin/core/defaults';

import { fadeAnimation } from '@sn/shared/animations';
import { IPageable, Page, PageableSearch } from '@sn/shared/models';
import { 
  AbstractPageOverlayLoader, 
  DrawerLocation, 
  DrawerService, 
  OverlayLoaderService } from '@sn/shared/components';


@Component({
  selector: 'sn-admin-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class ViewAccountsComponent extends AbstractPageOverlayLoader implements OnInit {
  public DrawerLocation = DrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_ACCOUNTS_PAGE;

  public searchAccountsResult$: Observable<Page<Account>>;
  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<IAccountsState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

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
    // this._drawerService.show(AccountCreateComponent, {});
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
