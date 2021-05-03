import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentMarkdown } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IDocumentsState } from '../../store/reducers';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { SpinnerStyle } from '@sn/shared/components';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  animations: [fadeAnimation]
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  public SpinnerStyle = SpinnerStyle;
  public documentMarkdown$: Observable<DocumentMarkdown>;

  constructor(
    private _store: Store<IDocumentsState>
  ) { }

  ngOnInit(): void {
    this.documentMarkdown$ = this._store.select(fromSelectors.selectDocumentMarkdownPreview); 
  }

  ngOnDestroy(): void {
    this._store.dispatch(fromActions.setDocumentMarkdownPreview({ documentMarkdown: null }));
  }
}
