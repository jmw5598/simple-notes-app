import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { fadeAnimation } from '@sn/shared/animations';
import { selectSearchTopicsFromDrawerResult, selectSearchTopicsResult } from '@sn/core/store/selectors';
import { Page } from '@sn/core/models';
import { Topic } from '@sn/shared/models';
import { IPageable } from '@sn/core/models';
import { PageableSearch } from '@sn/core/models'
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/core/defaults';
import { searchTopicsFromDrawer, searchTopicsFromDrawerResult } from '@sn/core/store/actions';
import { DrawerService } from '../drawer/drawer.service';

@Component({
  selector: 'sn-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.scss'],
  animations: [fadeAnimation]
})
export class TopicSearchComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
  public searchResults$: Observable<Page<Topic>>;

  constructor(
    private _router: Router,
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.searchResults$ = this._store.select(selectSearchTopicsFromDrawerResult);
  }

  public onSearchTopics(value: any): void {
    if (value) {
      const topicSearch: PageableSearch = {
        searchTerm: value,
        pageable: this.DEFAULT_PAGE
      };
      this._store.dispatch(searchTopicsFromDrawer({ search: topicSearch }));
    } else {
      this._store.dispatch(searchTopicsFromDrawerResult({ page: null }));
    }
  }

  public onGoToTopic(id: number): void {
    this._router.navigate(['/dashboard', 'topics', id, 'details']);
    this._drawerService.close();
  }

  ngOnDestroy(): void {
    this._store.dispatch(searchTopicsFromDrawerResult({ page: null }));
  }
}
