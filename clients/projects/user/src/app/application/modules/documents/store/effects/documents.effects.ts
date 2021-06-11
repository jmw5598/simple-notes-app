import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '@sn/application/store/actions/http-error.actions';
import { of } from 'rxjs';
import { exhaustMap, switchMap, map, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { DocumentsService } from '@sn/core/services/documents.service';
import { PageableSearch, ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';
import { SectionsService } from '@sn/core/services';

@Injectable()
export class DocumentsEffects {
  constructor(
    private _actions: Actions,
    private _documentsService: DocumentsService,
    private _sectionsService: SectionsService
  ) {}

  getDocumentById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getDocumentById),
    switchMap(({ documentId }) => this._documentsService.findOne(documentId)
      .pipe(
        map(document => fromActions.setBuilderDocument({ document: document })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  
  getDocumentMarkdownPreviewById = createEffect(() => this._actions.pipe(
    ofType(fromActions.getDocumentMarkdownPreviewById),
    switchMap(({ documentId }) => this._documentsService.getDocumentMarkdownPreviewById(documentId)
      .pipe(
        map(documentMarkdown => fromActions.setDocumentMarkdownPreview({ documentMarkdown: documentMarkdown })),
        catchError(error => of(handleHttpError({ error: error })))
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
        message: `Successfully updated document!`
      } as ResponseMessage
      return of(fromActions.setUpdateDocumentResponseMessage({ message: message }))
    })
  ));

  deleteDocumentSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteDocumentSuccess),
    switchMap(({document}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted document!`
      } as ResponseMessage
      return of(fromActions.setDeleteDocumentResponseMessage({ message: message }))
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

  getSectionsTopicById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getSectionsByTopicId),
    switchMap(({topicId}) => this._sectionsService.findSectionsByTopicId(topicId)
      .pipe(
        map(result => fromActions.getSectionsByTopicIdSuccess({ sections: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  exportDocument$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.exportDocument),
    exhaustMap(({documentId, config}) => this._documentsService.exportDocument(documentId, config)
      .pipe(
        map(result => fromActions.exportDocumentSuccess({ file: result })),
        catchError(error => {
          const errorMessage: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error exporting your document!`
          } as ResponseMessage
          return of(fromActions.setExportDocumentResponseMessage({ message: errorMessage }))
        })
      )
    )
  ));

  exportDocumentSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.exportDocumentSuccess),
    switchMap(({file}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `We successfully export your document!`
      } as ResponseMessage
      return of(fromActions.setExportDocumentResponseMessage({ message: message }))
    })
  ));
}
