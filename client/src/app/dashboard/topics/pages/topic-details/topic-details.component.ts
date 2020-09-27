import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectSelectedTopic, selectSearchSectionsResult, selectExportTopicResponseMessage, selectExportTopicFile } from '@sn/core/store/selectors';
import { searchSections, exportTopic, deleteSection, setExportTopicFileResponse, setExportTopicResponseMessage, searchSectionsResult } from '@sn/core/store/actions';
import { ExportConfig, ExportFormat, FileResponse, Topic, Section } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { PageableSearch, PageRequest, Page, IPageable, ResponseMessage } from '@sn/core/models';
import * as FileSaver from 'file-saver';
import { ModalService } from '@sn/shared/components';
import { DEFAULT_SEARCH_SECTIONS_PAGE } from '@sn/core/defaults';

@Component({
  selector: 'sn-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  animations: [fadeAnimation]
})
export class TopicDetailsComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_SECTIONS_PAGE;
  public topic$: Observable<Topic>;
  public exportTopicResponseMessage$: Observable<ResponseMessage>;
  public exportTopicFile$: Observable<FileResponse>;
  private _topicId: number;
  public searchSectionsResult$: Observable<Page<Section>>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<IAppState>,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.searchSectionsResult$ = this._store.select(selectSearchSectionsResult);
    this.exportTopicResponseMessage$ = this._store.select(selectExportTopicResponseMessage);
    this.exportTopicFile$ = this._store.select(selectExportTopicFile)
      .pipe(
        tap((file:FileResponse) => {
          if (file) {
            FileSaver.saveAs(file.blob, file.filename)
          }
        })
      );

    this.topic$ = this._store.select(selectSelectedTopic)
      .pipe(tap((topic: Topic) => {
        this._topicId = topic.id;
      }));
  }

  public onDeleteSection(sectionId: number): void {
    this._store.dispatch(deleteSection({
      sectionId: sectionId,
      topicId: this._topicId
    }))
  }

  public onExportTopic(config: ExportConfig): void {
    this._store.dispatch(exportTopic({
      topicId: this._topicId,
      config: config
    }));
  }

  public onOpenExportModal(): void {
    this._modalService.show();
  }

  public onCloseExportModal(): void {
    this._modalService.close();
  }

  public onSearchSections(searchTerm: string): void {
    this.searchTerm = searchTerm;
    const topicSearch: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(searchSections({ topicId: this._topicId, search: topicSearch }));
  }

  public onGoToPage(pageable: IPageable): void {
    const topicSearch: PageableSearch = {
      searchTerm: this.searchTerm,
      pageable: pageable
    };
    this._store.dispatch(searchSections({ topicId: this._topicId, search: topicSearch }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(searchSectionsResult({ page: null }));
    this._store.dispatch(setExportTopicResponseMessage({ message : null }));
    this._store.dispatch(setExportTopicFileResponse({ file: null }));
  }
}
