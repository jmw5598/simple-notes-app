import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from '@sn/shared/models';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class ThemesService {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    private _http: HttpClient
  ) { }

  public findAll(): Observable<Theme[]> {
    return this._http.get<Theme[]>(`${this._configuration.api.baseUrl}/themes`);
  }
}
