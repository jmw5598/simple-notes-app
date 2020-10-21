import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic, selectSearchSectionsResult, selectCreateSectionResponseMessage } from '@sn/core/store/selectors';
import { searchSections, deleteSection, setExportTopicFileResponse, setExportTopicResponseMessage, searchSectionsResult } from '@sn/core/store/actions';
import { FileResponse, Topic, Section } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { PageableSearch, Page, IPageable, ResponseMessage } from '@sn/core/models';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { DEFAULT_SEARCH_SECTIONS_PAGE } from '@sn/core/defaults';
import { TopicExportComponent } from '../../components/topic-export/topic-export.component';
import { TopicUpdateComponent } from '../../components/topic-update/topic-update.component';
import { SectionUpdateComponent } from '../../components/section-update/section-update.component';
import { SectionCreateComponent } from '../../components/section-create/section-create.component';
import { ResponseStatus } from '@sn/core/enums';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  public DrawerLocation = DrawerLocation;
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_SECTIONS_PAGE;
  private _subscriptionSubject: Subject<void>;

  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  private _topic: Topic;
  public searchSectionsResult$: Observable<Page<Section>>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this.searchSectionsResult$ = this._store.select(selectSearchSectionsResult);
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
      topicId: this._topic.id
    }))
  }

  public onOpenExportTopic(): void {
    this._drawerService.show(
      TopicExportComponent, 
      this._topic
    );
  }

  public onUpdateTopic(): void {
    this._drawerService.show(
      TopicUpdateComponent,
      this._topic
    );
  }

  public onCreateSection(): void {
    this._drawerService.show(
      SectionCreateComponent,
      { topic: this._topic }
    );
  }

  public onEditSectionDetails(section: Section): void {
    this._drawerService.show(
      SectionUpdateComponent,
      { topic: this._topic, section: section }
    );
  }

  public onSearchSections(searchTerm: string): void {
    this.searchTerm = searchTerm;
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
