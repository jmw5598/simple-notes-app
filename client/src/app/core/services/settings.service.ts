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

  public createKeyboardShortcut(actionId: number, shortcut: string): Observable<KeyboardShortcutAction> {
    return this._http.post<KeyboardShortcutAction>(
      `${environment.api.baseUrl}/accounts/settings/shortcuts`,
      { actionId, shortcut }
    );
  }

  public updateKeyboardShortcut(shortcutId: number, shortcut: KeyboardShortcutAction): Observable<KeyboardShortcutAction> {
    return this._http.put<KeyboardShortcutAction>(
      `${environment.api.baseUrl}/accounts/settings/shortcuts/${shortcutId}`,
      shortcut
    )
  }

  public deleteKeyboardShortcut(shortcutId: number): Observable<KeyboardShortcutAction> {
    return this._http.delete<KeyboardShortcutAction>(
      `${environment.api.baseUrl}/accounts/settings/shortcuts/${shortcutId}`
    );
  }
}
