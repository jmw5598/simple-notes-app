import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { CalendarIntegration } from '@sn/shared/models';
import { of } from 'rxjs';
import { inactiveCalendarIntegration, refreshCalendarIntegration } from '../../store/actions';

import { AccountSettingsIntegrationsComponent } from './account-settings-integrations.component';

describe('AccountSettingsIntegrationsComponent', () => {
  let component: AccountSettingsIntegrationsComponent;
  let fixture: ComponentFixture<AccountSettingsIntegrationsComponent>;
  const testStore = {
    select: () => of(),
    dispatch: (action: any) => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        AccountSettingsIntegrationsComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action when authorizeGoogleCalendarIntegration is called', () => {
    spyOn(testStore, 'dispatch');
    component.authorizeGoogleCalendarIntegration();
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch action when onInactivateIntegration is called', () => {
    const calendarIntegration: CalendarIntegration = { id: 1 } as CalendarIntegration;
    spyOn(testStore, 'dispatch');
    component.onInactivateIntegration(calendarIntegration);
    expect(testStore.dispatch).toHaveBeenCalledWith(inactiveCalendarIntegration({ id: calendarIntegration?.id }))
  });

  it('should dispatch action when onRefreshIntegration is called', () => {
    const calendarIntegration: CalendarIntegration = { id: 1 } as CalendarIntegration;
    spyOn(testStore, 'dispatch');
    component.onRefreshIntegration(calendarIntegration);
    expect(testStore.dispatch).toHaveBeenCalledWith(refreshCalendarIntegration({ 
      id: calendarIntegration?.id, 
      integration: calendarIntegration 
    }));
  });
});
