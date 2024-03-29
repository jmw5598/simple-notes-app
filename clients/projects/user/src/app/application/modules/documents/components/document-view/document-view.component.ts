import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Document, DocumentMarkdown, ExportConfig, ExportFormat, FileResponse } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IDocumentsState } from '../../store/reducers';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';

import * as FileSaver from 'file-saver';
import { ResponseMessage } from '@sn/shared/models';

import { fadeAnimation, showHide } from '@sn/shared/animations';
import { SnSpinnerStyle } from '@sn/loading-spinner';

@Component({
  selector: 'sn-user-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, showHide]
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  public SnSpinnerStyle = SnSpinnerStyle;
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public documentMarkdown$: Observable<DocumentMarkdown>;
  public exportDocumentFile$: Observable<FileResponse>;
  public responseMessage$: Observable<ResponseMessage>;

  public isLoading: boolean = true;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<IDocumentsState>
  ) { }

  ngOnInit(): void {
    this._selectState();
  }

  public exportToMarkdown(document: Document): void {
    const config: ExportConfig = { format: ExportFormat.MD } as ExportConfig;
    this._store.dispatch(fromActions.exportDocument({
      documentId: document?.id || -1,
      config: config
    }));
  }

  public exportToPdf(document: Document): void {
    const config: ExportConfig = { format: ExportFormat.PDF } as ExportConfig;
    this._store.dispatch(fromActions.exportDocument({
      documentId: document?.id || -1,
      config: config
    }));
  }

  public refreshDocument(document: Document): void {
    this._store.dispatch(fromActions.getDocumentMarkdownPreviewById({
      documentId: document?.id || -1
    }));
  }

  private _selectState(): void {
    this.documentMarkdown$ = this._store.select(fromSelectors.selectDocumentMarkdownPreview)
      .pipe(tap(document => {
        if (document) {
          setTimeout(() => {
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
          }, 250);
        }
      }));

    this._store.select(fromSelectors.selectExportDocumentFileResponse)
      .pipe(
        takeUntil(this._subscriptionSubject),
        tap((file:FileResponse) => {
          if (file) {
            FileSaver.saveAs(file.blob, file.filename)
          }
        })
      ).subscribe();
    
    this.responseMessage$ = this._store.select(fromSelectors.selectExportDocumentResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => 
              this._store.dispatch(fromActions.setExportDocumentResponseMessage({ message: null }))
            , 3000)
          }
        })
      );
  }

  ngOnDestroy(): void {
    this._store.dispatch(fromActions.setDocumentMarkdownPreview({ documentMarkdown: null }));
    this._store.dispatch(fromActions.setExportDocumentFileResponse({ file: null }));
    this._store.dispatch(fromActions.setExportDocumentResponseMessage({ message: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
