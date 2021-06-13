import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyboardShortcutAction, Theme } from '@sn/shared/models';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    private _http: HttpClient
  ) { }

  public getKeyboardShortcuts(): Observable<KeyboardShortcutAction[]> {
    return this._http.get<KeyboardShortcutAction[]>(
      `${this._configuration.api.baseUrl}/accounts/settings/shortcuts`
    );
  }

  public createKeyboardShortcut(actionId: number, shortcut: string): Observable<KeyboardShortcutAction> {
    return this._http.post<KeyboardShortcutAction>(
      `${this._configuration.api.baseUrl}/accounts/settings/shortcuts`,
      { actionId, shortcut }
    );
  }

  public updateKeyboardShortcut(actionId: number, shortcutId: number, shortcut: string): Observable<KeyboardShortcutAction> {
    return this._http.put<KeyboardShortcutAction>(
      `${this._configuration.api.baseUrl}/accounts/settings/shortcuts/${shortcutId}`,
      { actionId, shortcut }
    );
  }

  public deleteKeyboardShortcut(shortcutId: number): Observable<KeyboardShortcutAction> {
    return this._http.delete<KeyboardShortcutAction>(
      `${this._configuration.api.baseUrl}/accounts/settings/shortcuts/${shortcutId}`
    );
  }

  public changeAccountTheme(theme: Theme): Observable<Theme> {
    return this._http.put<Theme>(
      `${this._configuration.api.baseUrl}/accounts/settings/themes/${theme.id}`, theme
    );
  }
}
