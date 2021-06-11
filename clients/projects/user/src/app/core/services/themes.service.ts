import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@sn/user/env/environment';
import { Observable } from 'rxjs';
import { Theme } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  constructor(
    private _http: HttpClient
  ) { }

  public findAll(): Observable<Theme[]> {
    return this._http.get<Theme[]>(`${environment.api.baseUrl}/themes`);
  }
}
