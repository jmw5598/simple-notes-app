import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud.service';
import { Topic, ExportConfig } from '@sn/shared/models';
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class TopicsService extends AbstractCrudService<Topic, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/topics`);
  }

  public exportTopic(topicId: number, config: ExportConfig): Observable<Blob> {
    // TODO - May have to pipe and transforms the respose to Blob??
    return this._http.post<Blob>(`${environment.api.baseUrl}/topics/${topicId}/download`, config)
      .pipe(map(res => {
        return new Blob();
      }));
  }
}
