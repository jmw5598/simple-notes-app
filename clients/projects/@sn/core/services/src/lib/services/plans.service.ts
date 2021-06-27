import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractCrudService } from './abstract-crud.service';
import { Plan } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';
import { Observable } from 'rxjs';

@Injectable()
export class PlansService extends AbstractCrudService<Plan, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) {
    super(_http, `${_configuration.api.baseUrl}/plans`);
  }

  public getActivePlans(): Observable<Plan[]> {
    return this._http.get<Plan[]>(`${this._base}/active`);
  }
}
