import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
