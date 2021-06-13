import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DrawerService } from '@sn/user/shared/components';

import { SharedModule } from '@sn/user/shared/shared.module'
import { EMPTY, Observable, of } from 'rxjs';
import { CalendarEventViewComponent } from './calendar-event-view.component';
import { CalendarEventDetailsComponent } from '../calendar-event-details/calendar-event-details.component';
import { CalendarEvent } from '@sn/shared/models';
import { deleteCalendarEvent } from '../../store/actions';

describe('CalendarEventViewComponent', () => {
  let component: CalendarEventViewComponent;
  let fixture: ComponentFixture<CalendarEventViewComponent>;
  const testDrawerService = {
    close(): void {},
    onDataChange(): Observable<any> { return of(EMPTY) }
  };
  
  const testStore = {
    select: () => {
      return of(EMPTY)
    },
    dispatch: (action: any) => {}
  }

  const mockCalendarEvent: CalendarEvent = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    startDateTime: new Date(),
    endDateTime: new Date(),
    description: 'Mock Description',
    title: 'Mock Title',
    isAllDay: false,
    location: 'Mock Location',
    color: '#000000'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        CalendarEventViewComponent,
        CalendarEventDetailsComponent 
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: DrawerService,
          useValue: testDrawerService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display calendar event edit view when onEdit is called from display view', () => {
    const dispalyView: string = 'display';
    const editView: string = 'edit';
    component.calendarEventView = dispalyView;
    component.onEdit();
    expect(component.calendarEventView).toEqual(editView);
  });

  it('should display calendar event display view when onEdit is called from edit view', () => {
    const dispalyView: string = 'display';
    const editView: string = 'edit';
    component.calendarEventView = editView;
    component.onEdit();
    expect(component.calendarEventView).toEqual(dispalyView);
  });

  it('should call Store.dispatch and close drawer when onDelete is called', () => {
    spyOn(testStore, 'dispatch');
    spyOn(testDrawerService, 'close');
    const calendarEvent: Partial<CalendarEvent> = { id: 1 };
    component.data = calendarEvent;
    component.onDelete();
    expect(testStore.dispatch).toHaveBeenCalledWith(
      deleteCalendarEvent({ id: calendarEvent.id })
    );
    expect(testDrawerService.close).toHaveBeenCalledTimes(1);
  });

  it('should close drawer when onCancel is called', () => {
    spyOn(testDrawerService, 'close');
    component.onCancel();
    expect(testDrawerService.close).toHaveBeenCalledTimes(1);
  });

  it('should populate calendar event form and dispatch event to update update event', () => {
    spyOn(testStore, 'dispatch');
    component.form.patchValue({...mockCalendarEvent});
    const calendarEventFormValue: any = component.form.value;
    component.onUpdate(calendarEventFormValue);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
