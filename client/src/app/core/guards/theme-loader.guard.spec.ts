import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { UserSettings } from '../models/user-settings.model';
import { DynamicThemeService } from '../services';
import { Theme } from '@sn/core/models';

import { ThemeLoaderGuard } from './theme-loader.guard';
import { DEFAULT_THEME_FILE } from '../defaults';

describe('ThemeLoaderGuard', () => {
  let guard: ThemeLoaderGuard;

  const dynamicThemeServiceMock = {
    loadStyle(style: string) {}
  }

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select(selector: any) { return this._data.asObservable(); },
    dispatch(action: any) { this._data.next(action); }
  };

  const userSettingsMock: UserSettings = {
    theme: {
      id: 1,
      name: 'Test Theme',
      filename: 'theme-test.css',
      cssClassName: 'theme-test'
    } as Theme
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicThemeService,
          useValue: dynamicThemeServiceMock
        },
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(ThemeLoaderGuard);
  });

  afterEach(() => {
    testStore.dispatch(null);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not load theme styles when activating application with no theme set for user', () => {
    spyOn(dynamicThemeServiceMock, 'loadStyle');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
        expect(dynamicThemeServiceMock.loadStyle).not.toHaveBeenCalled();
      });
    testStore.dispatch({});
  });

  it('should load theme styles when activating application with a theme set for user', (done) => {
    spyOn(dynamicThemeServiceMock, 'loadStyle');
    guard.canActivate(null, null)
      .pipe(skip(1), take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
        expect(dynamicThemeServiceMock.loadStyle).toHaveBeenCalledWith(userSettingsMock.theme.filename);
        done();
      });
    testStore.dispatch(userSettingsMock);
  });

  it('should load default theme styles when deactivating application', () => {
    spyOn(dynamicThemeServiceMock, 'loadStyle');
    guard.canDeactivate(null, null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
        expect(dynamicThemeServiceMock.loadStyle).toHaveBeenCalledWith(DEFAULT_THEME_FILE);
      });
  });
});
