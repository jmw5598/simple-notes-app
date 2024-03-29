import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { showHide } from '@sn/shared/animations';
import { Store } from '@ngrx/store';
import { IDocumentsState } from '@sn/user/application/modules/documents/store/reducers';
import { ResponseMessage } from '@sn/shared/models';
import { Document } from '@sn/shared/models';

import * as documentSelectors from '@sn/user/application/modules/documents/store/selectors';
import * as documentActions from '@sn/user/application/modules/documents/store/actions';

import { SnDrawerService } from '@sn/drawer';
import { SnDocumentBuilderFormComponent } from '@sn/user/shared/modules/document-builder';

@Component({
  selector: 'sn-user-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SnDocumentCreateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();

  @ViewChild(SnDocumentBuilderFormComponent, { static: true })
  public documentBuilderFormComponent!: SnDocumentBuilderFormComponent;

  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  public document: Document;
  public document$: Observable<Document>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<IDocumentsState>,
    private _drawerService: SnDrawerService
  ) { }

  ngOnInit(): void {
    // this._documentBuilderService.setDocumentContainer(this.document);
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.responseMessage$ = this._store.select(documentSelectors.selectCreateDocumentResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.documentBuilderFormComponent.resetDocumentBuilder();
            setTimeout(() => this._store.dispatch(documentActions.setCreateDocumentResponseMessage({ message: null })), 3000);
          }
        })
      );

    this.document$ = this._store.select(documentSelectors.selectDocumentBuilderDocument);

    this.syncBuilderDocumentWithForm();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(document: Document): void {
    // TODO Fix this, this is wonky, form changes should update documentbuilder doc state with name???
    const newDocument: Document = {
      ...document,
      documentTopics: this.document.documentTopics
    }
    this._store.dispatch(documentActions.createDocument({ document: newDocument }));
  }

  private syncBuilderDocumentWithForm(): void {
    this.document$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(document => {
        this.document = document;
        this.form.patchValue({
          ...document
        });
      });
  }

  ngOnDestroy(): void {
    this._store.dispatch(documentActions.setBuilderDocument({ document: null }));
    this._store.dispatch(documentActions.setBuilderSearchTopicSelection({ documentTopic: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
