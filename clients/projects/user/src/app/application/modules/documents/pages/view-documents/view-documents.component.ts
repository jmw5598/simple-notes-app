import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import { IDocumentsState } from '../../store/reducers/documents.reducers'
import { DEFAULT_SEARCH_DOCUMENTS_PAGE } from '@sn/user/core/defaults';
import { takeUntil, tap } from 'rxjs/operators';
import { DocumentCreateComponent } from '@sn/user/shared/components';
import { DocumentUpdateComponent } from '../../components/document-update/document-update.component';

import * as documentActions from '../../store/actions';
import * as documentSelectors from '../../store/selectors';
import { DocumentViewComponent } from '../../components/document-view/document-view.component';

import { fadeAnimation } from '@sn/shared/animations';
import { IPageable, Page, PageableSearch, Document } from '@sn/shared/models';

import { SnDrawerService, SnDrawerLocation, SnDrawerSize } from '@sn/drawer';

@Component({
  selector: 'sn-user-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnDrawerService],
  animations: [fadeAnimation]
})
export class ViewDocumentsComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_DOCUMENTS_PAGE;
  public DrawerLocation = SnDrawerLocation;
  public searchDocumentsResult$: Observable<Page<Document>>

  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<IDocumentsState>,
    private _drawerService: SnDrawerService,
  ) { }

  ngOnInit(): void {
    this._selectState();
  }

  public onSearchDocuments(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const search: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(documentActions.searchDocuments({ search: search }));
  }

  public onDelete(id: number): void {
    this._store.dispatch(documentActions.deleteDocument({ id: id }));
  }

  public onEdit(document: Document): void {
    this._store.dispatch(documentActions.getDocumentById({ documentId: document.id }));
    this._drawerService.show(DocumentUpdateComponent, {
      size: SnDrawerSize.LARGE,
      data: document 
    });
  }

  public onView(document: Document): void {
    this._store.dispatch(documentActions.getDocumentMarkdownPreviewById({ documentId: document.id }));
    this._drawerService.show(DocumentViewComponent, {
      size: SnDrawerSize.MEDIUM,
      data: document 
    });
  }

  public onCreate(): void {
    this._drawerService.show(DocumentCreateComponent, {
      size: SnDrawerSize.LARGE
    });
  }

  public onGoToPage(pageable: IPageable): void {
    const documentSearch: PageableSearch = {
      searchTerm: this.searchTerm || '',
      pageable: pageable
    };
    this._store.dispatch(documentActions.searchDocuments({ search: documentSearch }));
  }

  private _selectState(): void {
    this.searchDocumentsResult$ = this._store.select(documentSelectors.selectSearchDocumentsResult)
      .pipe(tap(() => this.isSearching = false));
    
    combineLatest([
      this._store.select(documentSelectors.selectCreateDocumentResponseMessage),
      this._store.select(documentSelectors.selectUpdateDocumentResponseMessage),
      this._store.select(documentSelectors.selectDeleteDocumentResponseMessage)
    ])
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(([createMessage, updateMessage, deleteMessage]) => {
        if (createMessage || updateMessage || deleteMessage) {
          this.onSearchDocuments(this.searchTerm || '');
          this.clearResponseMessages();
        }
      });
  }

  private clearResponseMessages(): void {
    this._store.dispatch(documentActions.setDeleteDocumentResponseMessage({ message: null }));
  }
  
  ngOnDestroy(): void {
    this._store.dispatch(documentActions.searchDocumentsResult({ page: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
