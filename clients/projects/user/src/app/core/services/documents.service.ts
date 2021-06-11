import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { Document, DocumentMarkdown, ExportConfig, FileResponse } from '@sn/user/shared/models';
import { IPageable, Page } from '@sn/user/core/models';
import { environment } from '@sn/user/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends AbstractCrudService<Document, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/documents`);
  }

  public searchDocuments(searchTerm: string, page?: IPageable): Observable<Page<Document>> {
    const params: {[key: string]: any} = !page ? {} : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<Document>>(`${this._base}/search`, { params: params });
  }

  public getDocumentMarkdownPreviewById(documentId: number): Observable<DocumentMarkdown> {
    return this._http.get<DocumentMarkdown>(`${this._base}/${documentId}/markdown`);
  }

  public exportDocument(documentId: number, config: ExportConfig): Observable<FileResponse> {
    const url: string = `${environment.api.baseUrl}/documents/${documentId}/download`;
    const options: {[key: string]: any} = { observe: 'response', responseType: 'blob', };
    return this._http.post(url, config, { observe: 'response', responseType: 'blob', })
      .pipe(map(response => this._extractFile(response)));
  }

  private _extractFile(res: Response | any) {
    const header = res.headers.get('Content-Disposition');
    const filename = header.substring(header.indexOf('filename'), header.length).split("=")[1];
    return new FileResponse(res.body, filename);
  }
}
