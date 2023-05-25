import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl, UntypedFormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { CalendarEventFormComponent } from './calendar-event-form.component';

describe('CalendarEventFormComponent', () => {
  let component: CalendarEventFormComponent;
  let fixture: ComponentFixture<CalendarEventFormComponent>;

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

  const mockColorEvent = {
    $event: { 
      preventDefault: () => {},
      keyCode: 13
    } as Partial<MouseEvent>,
    color: {
      hex: '#FFFFFF'
    }
  };

  const mockCalendarEventFormValue = {
    id: '',
    title: 'Test Title',
    startDate: '2021-01-01',
    startTime: '10:00',
    endDate: '2021-01-01',
    endTime: '11:11',
    isAllDay: false,
    color: '#FFFFFF',
    location: 'Testing Location',
    description: 'Testing Description'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot()
      ],
      declarations: [
        CalendarEventFormComponent
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
    fixture = TestBed.createComponent(CalendarEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form when rest method is called', () => {
    spyOn(component.form, 'reset');
    component.reset();
    expect(component.form.reset).toHaveBeenCalledTimes(1);
  })

  it('should toggle isColorSwatchPickerShown variable when showColorSwatchPicker method is called', () => {
    component.isColorSwatchPickerShown = false;
    component.showColorSwatchPicker();
    expect(component.isColorSwatchPickerShown).toBeTrue();
    component.showColorSwatchPicker();
    expect(component.isColorSwatchPickerShown).toBeFalse();
  });

  it('should set form with updated color when handleColorSwatchChangeComplete is called', () => {
    component.isColorSwatchPickerShown = true;
    component.handleColorSwatchChangeComplete(mockColorEvent);
    expect(component.isColorSwatchPickerShown).toBeFalse();
    expect(component.form.get('color').value).toBe(mockColorEvent?.color?.hex);
  });

  it('should populate form with mock data with form validity as true', () => {
    const formValue = {...mockCalendarEventFormValue};
    component.form.patchValue(formValue);
    expect(component.form.valid).toBeTrue();
  });

  it('should populate form with mock data with form validity  as false', () => {
    const formValue = {
      ...mockCalendarEventFormValue,
      color: '$ddd' // Invalid value
    };
    component.form.patchValue(formValue);
    expect(component.form.valid).toBeFalse();
  });
});
