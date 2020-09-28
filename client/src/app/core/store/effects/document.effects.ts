import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { debounceTime, exhaustMap, switchMap, map, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { DocumentsService } from '@sn/core/services';
import { PageableSearch, ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';

@Injectable()
export class DocumentEffects {
  constructor(
    private _actions: Actions,
    private _documentsService: DocumentsService
  ) {}

  getDocumentById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getDocumentById),
    switchMap(({ documentId }) => this._documentsService.findOne(documentId)
      .pipe(
        map(document => fromActions.setSelectedDocument({ document: document })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  createDocument$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createDocument),
    exhaustMap(({ document }) => this._documentsService.save(document)
      .pipe(
        map(document => fromActions.createDocumentSuccess({ document: document })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  createDocumnetSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createDocumentSuccess),
    switchMap(({ document }) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully created document!`
      } as ResponseMessage;
      return of(fromActions.setCreateDocumentResponseMessage({ message: message }))
    })
  ));

  updateDocument$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateDocument),
    exhaustMap(({ id, document }) => this._documentsService.update(id, document)
      .pipe(
        map(document => fromActions.updateDocumentSuccess({ document: document })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your document, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdateDocumentResponseMessage({ message: message }));
        })
      ))
  ));

  updateDocumentSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateDocumentSuccess),
    switchMap(({document}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated topic!`
      } as ResponseMessage
      return of(fromActions.setUpdateDocumentResponseMessage({ message: message }))
    })
  ));

  deleteDocument$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteDocument),
    exhaustMap(({id}) => this._documentsService.delete(id)
      .pipe(
        map(document => fromActions.deleteDocumentSuccess({ document: document })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  searchDocuments$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchDocuments),
    debounceTime(500),
    switchMap(({search}) => {
      const searchs: PageableSearch = search
      return this._documentsService.searchDocuments(searchs.searchTerm, searchs.pageable)
        .pipe(
          map(result => fromActions.searchDocumentsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));
}
