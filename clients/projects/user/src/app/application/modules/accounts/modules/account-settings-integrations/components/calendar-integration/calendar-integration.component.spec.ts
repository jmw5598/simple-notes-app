import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarIntegration, CalendarIntegrationType } from '@sn/core/models';

import { CalendarIntegrationComponent } from './calendar-integration.component';

describe('CalendarIntegrationComponent', () => {
  let component: CalendarIntegrationComponent;
  let fixture: ComponentFixture<CalendarIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value (onInactivateIntegration) when inactivateIntegration is called', () => {
    const integration: CalendarIntegration = {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1
    } as CalendarIntegration;
    spyOn(component.onInactivateIntegration, 'emit');
    
    component.inactivateIntegration(integration);
    expect(component.onInactivateIntegration.emit).toHaveBeenCalledWith(integration);
  });
  
  it('should emit value (onRefreshIntegration) when refreshIntegration is called', () => {
    const integration: CalendarIntegration = {
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1
    } as CalendarIntegration;
    spyOn(component.onRefreshIntegration, 'emit');
    
    component.refreshIntegration(integration);
    expect(component.onRefreshIntegration.emit).toHaveBeenCalledWith(integration);
  });

  it('should return false when isTokenExpired is called', () => {
    let tokenExpiration: Date = new Date();
    tokenExpiration.setTime(tokenExpiration.getTime() - 100000);
    const isTokenExpired: boolean = component.isTokenExpired(tokenExpiration);
    expect(isTokenExpired).toBeTrue();
  });

  // TODO Unit test activateIntegration
});
