import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SharedModule } from '@sn/user/shared/shared.module';
import { CalendarEvent } from '@sn/shared/models';
import { CalendarEventUpdateComponent } from './calendar-event-update.component';

describe('CalendarEventUpdateComponent', () => {
  let component: CalendarEventUpdateComponent;
  let fixture: ComponentFixture<CalendarEventUpdateComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    title: new UntypedFormControl('', [Validators.required]),
    startDate: new UntypedFormControl('', [Validators.required]),
    startTime: new UntypedFormControl('', [Validators.required]),
    endDate: new UntypedFormControl('', [Validators.required]),
    endTime: new UntypedFormControl('', [Validators.required]),
    isAllDay: new UntypedFormControl(false, [Validators.required]),
    color: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[#]{1}[A-Fa-f0-9]{6}$/)
    ]),
    location: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  });
  testFormGroupDirective.form = testFormGroup;

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
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        CalendarEventUpdateComponent
      ],
      providers: [
        {
          provide: ControlContainer, 
          useValue: testFormGroupDirective
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch mock calendar event to form and form should be valid', () => {
    component.event = mockCalendarEvent;
    component.ngOnInit();
    component.ngAfterViewInit();
    // fixture.detectChanges();
    jasmine.clock().tick(1);
    expect(component.form.valid).toBeTrue();
  });
});