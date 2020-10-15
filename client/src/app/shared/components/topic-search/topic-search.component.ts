import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { fadeAnimation } from '@sn/shared/animations';
import { selectSearchTopicsResult } from '@sn/core/store/selectors';
import { Page } from '@sn/core/models';
import { Topic } from '@sn/shared/models';
import { IPageable } from '@sn/core/models';
import { PageableSearch } from '@sn/core/models'
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/core/defaults';
import { searchTopics, searchTopicsResult } from '@sn/core/store/actions';
import { DrawerService } from '@sn/shared/components';

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
    this.searchResults$ = this._store.select(selectSearchTopicsResult);
  }

  // TODO Create separate piece of state for side panel search vs list search
  // This is because the list search is filtered by the same piece of state so
  // when the drawer is close and you navigate to topic list view, the list is
  // filtered base on the drawer search.
  // Tried clearing on onDestory of the drawer search compoent but wasnt working.

  public onSearchTopics(value: any): void {
    if (value) {
      const topicSearch: PageableSearch = {
        searchTerm: value,
        pageable: this.DEFAULT_PAGE
      };
      this._store.dispatch(searchTopics({ search: topicSearch }));
    } else {
      this._store.dispatch(searchTopicsResult({ page: null }));
    }
  }

  public onGoToTopic(id: number): void {
    this._router.navigate(['/dashboard', 'topics', id, 'details']);
    this._drawerService.close();
  }
}
