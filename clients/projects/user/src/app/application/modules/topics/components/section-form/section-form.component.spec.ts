import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators, ReactiveFormsModule } from '@angular/forms';
import { Section } from '@sn/shared/models';

import { SectionFormComponent } from './section-form.component';

describe('SectionFormComponent', () => {
  let component: SectionFormComponent;
  let fixture: ComponentFixture<SectionFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    synopsis: new FormControl('', [Validators.required])
  });
  testFormGroupDirective.form = testFormGroup;

  const mockSection = {
    id: null,
    title: 'Mock Section',
    synopsis: 'Mock Synopsis'
  } as Section;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        SectionFormComponent
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
    fixture = TestBed.createComponent(SectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.form.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch mock section through to form and be valid', () => {
    component.form.patchValue({...mockSection});
    expect(component.form.valid).toBeTrue();
  });

  it('should patch title through to form and be invalid', () => {
    component.form.patchValue({ title: mockSection.title });
    expect(component.form.valid).toBeFalse();
  });

  it('should patch synopsis through to form and be invalid', () => {
    component.form.patchValue({ synopsis: mockSection.synopsis });
    expect(component.form.valid).toBeFalse();
  });
});
