import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ISectionsState } from '../../store/reducers';
import { selectSelectedTopic, selectSearchSectionsResult, selectCreateSectionResponseMessage } from '../../store/selectors';
import { searchSections, deleteSection, setExportTopicFileResponse, setExportTopicResponseMessage, searchSectionsResult } from '../../store/actions';

import { DEFAULT_SEARCH_SECTIONS_PAGE } from '@sn/user/core/defaults';
import { TopicExportComponent } from '../../components/topic-export/topic-export.component';
import { TopicUpdateComponent } from '../../components/topic-update/topic-update.component';
import { SectionUpdateComponent } from '../../components/section-update/section-update.component';
import { SectionCreateComponent } from '../../components/section-create/section-create.component';

import { fadeAnimation } from '@sn/shared/animations';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';
import { PageableSearch, Page, IPageable, ResponseMessage, FileResponse, Topic, Section, ResponseStatus } from '@sn/shared/models';

@Component({
  selector: 'sn-user-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  public DrawerLocation = DrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_SECTIONS_PAGE;
  private _subscriptionSubject: Subject<void>;

  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  public _topic: Topic;
  public searchSectionsResult$: Observable<Page<Section>>;
  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<ISectionsState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.searchSectionsResult$ = this._store.select(selectSearchSectionsResult)
      .pipe(tap(() => {
        if (this.isSearching) {
          setTimeout(() => this.isSearching = false);
        }
      }));
    this._store.select(selectCreateSectionResponseMessage)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: ResponseMessage) => {
        if (message && message.status === ResponseStatus.SUCCESS) {
          this.onSearchSections(this.searchTerm);
        }
      })
    this.topic$ = this._store.select(selectSelectedTopic)
      .pipe(tap((topic: Topic) => {
        this._topic = topic;
        if (topic) {
          this.searchTerm = "";
          this.onSearchSections("");
        }
      }));
  }

  public onDeleteSection(sectionId: number): void {
    this._store.dispatch(deleteSection({
      sectionId: sectionId,
      topicId: this._topic?.id
    }))
  }

  public onOpenExportTopic(): void {
    this._drawerService.show(
      TopicExportComponent, 
      { data: this._topic }
    );
  }

  public onUpdateTopic(): void {
    this._drawerService.show(
      TopicUpdateComponent,
      { data: this._topic }
    );
  }

  public onCreateSection(): void {
    this._drawerService.show(
      SectionCreateComponent,
      { data: { topic: this._topic } }
    );
  }

  public onEditSectionDetails(section: Section): void {
    this._drawerService.show(
      SectionUpdateComponent,
      { data: { topic: this._topic, section: section } }
    );
  }

  public onSearchSections(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(searchSections({ topicId: this._topic.id, search: topicSearch }));
  }

  public onGoToPage(pageable: IPageable): void {
    const topicSearch: PageableSearch = {
      searchTerm: this.searchTerm,
      pageable: pageable
    };
    this._store.dispatch(searchSections({ topicId: this._topic.id, search: topicSearch }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(searchSectionsResult({ page: null }));
    this._store.dispatch(setExportTopicResponseMessage({ message : null }));
    this._store.dispatch(setExportTopicFileResponse({ file: null }));
  }
}
