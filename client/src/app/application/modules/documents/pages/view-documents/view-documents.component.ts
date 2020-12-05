import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IPageable, Page, PageableSearch } from '@sn/core/models';
import { Document } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';

import { IDocumentsState } from '../../store/reducers/documents.reducers'
import { selectSearchDocumentsResult } from '../../store/selectors';
import { searchDocuments, searchDocumentsResult } from '../../store/actions';

@Component({
  selector: 'sn-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss'],
  animations: [fadeAnimation]
})
export class ViewDocumentsComponent implements OnInit, OnDestroy {
  public documents$: Observable<Page<Document>>

  constructor(
    private _store: Store<IDocumentsState>
  ) { }

  ngOnInit(): void {
    this.documents$ = this._store.select(selectSearchDocumentsResult);
  }

  public onGoToPage(pageable: IPageable): void {
    const documentSearch: PageableSearch = {
      searchTerm: '', //this.searchTerm || '',
      pageable: pageable
    };
    this._store.dispatch(searchDocuments({ search: documentSearch }));
  }
  
  ngOnDestroy(): void {
    this._store.dispatch(searchDocumentsResult({ page: null }));
  }
}
