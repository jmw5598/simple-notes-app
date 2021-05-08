import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { IPageable, Page, PageableSearch } from '@sn/core/models';
import { Document } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';

import { IDocumentsState } from '../../store/reducers/documents.reducers'
import { DEFAULT_SEARCH_DOCUMENTS_PAGE } from '@sn/core/defaults';
import { takeUntil, tap } from 'rxjs/operators';
import { DrawerService, DrawerLocation, DrawerSize, OverlayLoaderService, AbstractPageOverlayLoader, DocumentCreateComponent } from '@sn/shared/components';
import { DocumentUpdateComponent } from '../../components/document-update/document-update.component';

import * as documentActions from '../../store/actions';
import * as documentSelectors from '../../store/selectors';
import { DocumentViewComponent } from '../../components/document-view/document-view.component';

@Component({
  selector: 'sn-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class ViewDocumentsComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_DOCUMENTS_PAGE;
  public DrawerLocation = DrawerLocation;
  public searchDocumentsResult$: Observable<Page<Document>>

  public searchTerm: string = '';
  public isSearching: boolean = false;

  constructor(
    private _store: Store<IDocumentsState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this.selectState();
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
      size: DrawerSize.LARGE,
      data: document 
    });
  }

  public onView(document: Document): void {
    this._store.dispatch(documentActions.getDocumentMarkdownPreviewById({ documentId: document.id }));
    this._drawerService.show(DocumentViewComponent, {
      size: DrawerSize.MEDIUM,
      data: document 
    });
  }

  public onCreate(): void {
    this._drawerService.show(DocumentCreateComponent, {
      size: DrawerSize.LARGE
    });
  }

  public onGoToPage(pageable: IPageable): void {
    const documentSearch: PageableSearch = {
      searchTerm: '', //this.searchTerm || '',
      pageable: pageable
    };
    this._store.dispatch(documentActions.searchDocuments({ search: documentSearch }));
  }

  private selectState(): void {
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
