import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarEventUpdateComponent } from './calendar-event-update.component';

describe('CalendarEventUpdateComponent', () => {
  let component: CalendarEventUpdateComponent;
  let fixture: ComponentFixture<CalendarEventUpdateComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    isAllDay: new FormControl(false, [Validators.required]),
    color: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[#]{1}[A-Fa-f0-9]{6}$/)
    ]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  testFormGroupDirective.form = testFormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        
        ReactiveFormsModule
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});