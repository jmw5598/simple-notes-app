import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyboardShortcutAction } from '../models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private _http: HttpClient
  ) { }

  public getKeyboardShortcuts(): Observable<KeyboardShortcutAction[]> {
    return this._http.get<KeyboardShortcutAction[]>(
      `${environment.api.baseUrl}/accounts/settings/shortcuts`
    );
  }
}
