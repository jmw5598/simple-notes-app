import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { CalendarIntegration } from '../models/calendar-integration.model';
import { CalendarIntegrationType } from '../models/calendar-integration-type.model';
import { environment } from '@sn/user/env/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntegrationsService extends AbstractCrudService<CalendarIntegration, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/calendar/integrations`)
  }

  public authorizeGoogleCalendarIntegration(): Observable<any> {
    return this._http.get(`${environment.api.baseUrl}/calendar/integrations/google`);
  }

  // TODO create endpoint to findAllGroupedByType
  public findAllGroupedByType(): Observable<CalendarIntegrationType[]> {
    return this._http.get<CalendarIntegrationType[]>(`${environment.api.baseUrl}/calendar/integrations/bytype`);
  }
}
