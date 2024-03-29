import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SnCalendarEventCreateComponent } from './calendar-event-create.component';
import { SnDrawerService } from '@sn/drawer';
import { SnCalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';

describe('CalendarEventCreateComponent', () => {
  let component: SnCalendarEventCreateComponent;
  let fixture: ComponentFixture<SnCalendarEventCreateComponent>;
  let drawerService: SnDrawerService;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };
  const mockFormValue: any = {
    id: 1,
    title: 'Calendar event title',
    description: 'Calendar event description',
    startDate: '01/10/2021',
    startTime: '11:00',
    endDate: '01/10/2021',
    endTime: '10:00',
    location: 'Calendar event location',
    isAllDay: false,
    color: '#123'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        SnCalendarEventCreateComponent,
        SnCalendarEventFormComponent
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
    fixture = TestBed.createComponent(SnCalendarEventCreateComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(SnDrawerService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    jasmine.clock().install();
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DrawerService.close when hide is called', () => {
    spyOn(drawerService, 'close')
    component.hide();
    expect(drawerService.close).toHaveBeenCalledTimes(1);
  })

  it('should call DrawerService.close when close button is clicked', () => {
    spyOn(drawerService, 'close');
    const calendarEventCreateElement: HTMLElement = fixture.nativeElement;
    const calendarEventCreateCloseElement: HTMLElement = calendarEventCreateElement.querySelector('.btn-close');
    calendarEventCreateCloseElement.click();
    expect(drawerService.close).toHaveBeenCalledTimes(1);
  });

  it('should call Store.dispatch when onSubmit is called', () => {
    component.form.patchValue({...mockFormValue});
    spyOn(testStore, 'dispatch');
    component.onSubmit(component.form.value);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  // TODO test response message observable somehow?
});
