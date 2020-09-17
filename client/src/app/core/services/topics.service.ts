import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractCrudService } from './abstract-crud.service';
import { Topic } from '@sn/shared/models';

import { environment } from '@env/environment'
@Injectable({
  providedIn: 'root'
})
export class TopicsService extends AbstractCrudService<Topic, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/topics`);
  }
}
