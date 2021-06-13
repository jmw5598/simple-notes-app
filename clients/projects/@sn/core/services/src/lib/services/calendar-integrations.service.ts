import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AbstractCrudService } from './abstract-crud.service';
import { CalendarIntegration, CalendarIntegrationType } from '@sn/shared/models';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class CalendarIntegrationsService extends AbstractCrudService<CalendarIntegration, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/calendar/integrations`)
  }

  public authorizeGoogleCalendarIntegration(): Observable<any> {
    return this._http.get(`${this._base}/calendar/integrations/google`);
  }

  // TODO create endpoint to findAllGroupedByType
  public findAllGroupedByType(): Observable<CalendarIntegrationType[]> {
    return this._http.get<CalendarIntegrationType[]>(`${this._base}/calendar/integrations/bytype`);
  }
}
