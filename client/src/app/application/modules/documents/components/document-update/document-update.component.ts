import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@sn/shared/components';
import { showHide } from '@sn/shared/animations';
import { Store } from '@ngrx/store';
import { IDocumentsState } from '@sn/application/modules/documents/store/reducers';
import { ResponseMessage } from '@sn/core/models';
import { Document } from '@sn/shared/models';

import * as documentSelectors from '@sn/application/modules/documents/store/selectors';
import * as documentActions from '@sn/application/modules/documents/store/actions';

@Component({
  selector: 'sn-document-update',
  templateUrl: './document-update.component.html',
  styleUrls: ['./document-update.component.scss'],
  animations: [showHide]
})
export class DocumentUpdateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  public document: Document = {
    id: 123,
    documentTopics: []
  } as Document;

  public document$: Observable<Document>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IDocumentsState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this._initializeDocumentForm();
    this._selectState();
    this._syncBuilderDocumentWithForm();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(document: Document): void {
    this._store.dispatch(documentActions.updateDocument({ 
      id: document.id,
      document: document 
    }));
  }

  private _initializeDocumentForm(): void {
    this.form = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required]]
    });
  }

  private _selectState(): void {
    this.document$ = this._store.select(documentSelectors.selectDocumentBuilderDocument);   
    this.responseMessage$ = this._store.select(documentSelectors.selectUpdateDocumentResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(documentActions.setCreateDocumentResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  private _syncBuilderDocumentWithForm(): void {
    this.document$.subscribe(document => {
      this.form.patchValue({
        ...document
      });
    })
  }

  ngOnDestroy(): void {
    // dispatch action to set null to selected document
    /// and document builder
  }
}
