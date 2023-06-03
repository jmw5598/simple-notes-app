import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ITopicsState } from '../../store/reducers';

import { fadeAnimation } from '@sn/shared/animations';
import { selectTopics, selectSearchTopicsResult, selectCreateTopicResponseMessage} from '../../store/selectors';
import { deleteTopic, searchTopics, searchTopicsResult } from '../../store/actions';
import { Page, IPageable } from '@sn/shared/models';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/user/core/defaults';
import { TopicCreateComponent } from '@sn/user/shared/components';

import { DrawerService, DrawerLocation, AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';
import { PageableSearch, ResponseMessage, Topic, ResponseStatus } from '@sn/shared/models';

@Component({
  selector: 'sn-user-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class ViewTopicsComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  public DrawerLocation = DrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
  private _subscriptionSubject: Subject<void>;
  public topics$: Observable<Topic[]>;
  public searchTopicsResult$: Observable<Page<Topic>>;
  
  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<ITopicsState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.topics$ = this._store.select(selectTopics);
    this._store.select(selectCreateTopicResponseMessage)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: ResponseMessage) => {
        if (message && message.status === ResponseStatus.SUCCESS) {
          this.onSearchTopics(this.searchTerm);
        }
      });
    this.searchTopicsResult$ = this._store.select(selectSearchTopicsResult)
      .pipe(tap(() => this.isSearching = false));
  }
  
  public onSearchTopics(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(searchTopics({ search: topicSearch }));
  }

  public onDelete(id: number): void {
    this._store.dispatch(deleteTopic({ id: id }));
  }

  public onCreate(): void {
    this._drawerService.show(TopicCreateComponent, {});
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
