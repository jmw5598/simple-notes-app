import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DrawerService } from '../drawer/drawer.service';
import { showHide } from '@sn/shared/animations';
import { Store } from '@ngrx/store';
import { IDocumentsState } from '@sn/application/modules/documents/store/reducers';
import { ResponseMessage } from '@sn/core/models';
import { Document } from '@sn/shared/models';
import { createDocument, setCreateDocumentResponseMessage } from '@sn/application/modules/documents/store/actions';
import { selectCreateDocumentResponseMessage } from '@sn/application/modules/documents/store/selectors';

@Component({
  selector: 'sn-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
  animations: [showHide]
})
export class DocumentCreateComponent implements OnInit {
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IDocumentsState>,
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.responseMessage$ = this._store.select(selectCreateDocumentResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(setCreateDocumentResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(document: Document): void {
    console.log(document);
    this._store.dispatch(createDocument({ document: document }));
  }
}
