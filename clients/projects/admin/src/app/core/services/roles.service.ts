import { Injectable } from '@angular/core';
import { AbstractCrudService } from '@sn/core/services';
import { HttpClient } from '@angular/common/http';

import { Role } from '@sn/shared/models';
import { environment } from '@sn/admin/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends AbstractCrudService<Role, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.baseUrl}/roles`);
  }

  public getActiveRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(`${this._base}/active`);
  }
}
