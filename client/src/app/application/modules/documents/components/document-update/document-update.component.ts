import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
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
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  public document$: Observable<Document>;
  public document: Document;

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
    console.log("document is ", document);
    console.log("this documetn is ", this.document);
    this._store.dispatch(documentActions.updateDocument({ 
      id: document.id,
      document: {
        ...document,
        documentTopics: this.document.documentTopics
      }
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
            setTimeout(() => this._store.dispatch(documentActions.setUpdateDocumentResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  private _syncBuilderDocumentWithForm(): void {
    this.document$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(document => {
        this.document = document;
        this.form.patchValue({ ...document });
    })
  }

  ngOnDestroy(): void {
    // TODO rethink this, causes issue with create document not drag and droppign???? maybe need to set to initial value???
    // Need to create action that resets Builder Document and sets as initial value???
    this._store.dispatch(documentActions.setBuilderDocument({ document: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
