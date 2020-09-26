import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '@sn/core/store/state';
import { Topic } from '@sn/shared/models';
import { PageableSearch } from '@sn/core/models';
import { fadeAnimation } from '@sn/shared/animations';
import { selectTopics, selectSearchTopicsResult} from '@sn/core/store/selectors';
import { deleteTopic, searchTopics, searchTopicsResult } from '@sn/core/store/actions';
import { Page, IPageable, PageRequest } from '@sn/core/models';

@Component({
  selector: 'sn-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss'],
  animations: [fadeAnimation]
})
export class ViewTopicsComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE: IPageable;
  public topics$: Observable<Topic[]>;
  public searchTopicsResult$: Observable<Page<Topic>>;

  public searchTerm: string = '';

  constructor(
    private _store: Store<IAppState>
  ) {
    this.DEFAULT_PAGE = PageRequest.from(1, 10, 'updatedAt', 'DESC');
  }

  ngOnInit(): void {
    this.topics$ = this._store.select(selectTopics);
    this.searchTopicsResult$ = this._store.select(selectSearchTopicsResult);
    this.onSearchTopics('');
  }
  
  public onSearchTopics(searchTerm: string): void {
    this.searchTerm = searchTerm;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(searchTopics({ search: topicSearch }));
  }

  public onDelete(id: number): void {
    console.log("deletling ", id);
    this._store.dispatch(deleteTopic({ id: id }));
  }

  public onGoToPage(pageable: IPageable): void {
    const topicSearch: PageableSearch = {
      searchTerm: this.searchTerm,
      pageable: pageable
    };
    this._store.dispatch(searchTopics({ search: topicSearch }));
  }

  ngOnDestroy() {
    this._store.dispatch(searchTopicsResult({ page: null }));
  }
}
