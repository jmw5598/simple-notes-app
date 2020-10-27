import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntegrationsService {
  constructor(protected _http: HttpClient) {}

  public authorizeGoogleCalendarIntegration(): Observable<any> {
    return this._http.get(`${environment.api.baseUrl}/calendar/integrations/google`);
  }
}
