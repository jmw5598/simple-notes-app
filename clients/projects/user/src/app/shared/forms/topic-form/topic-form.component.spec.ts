import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permission } from '@sn/shared/models';

import { TopicFormComponent } from './topic-form.component';
import { TagInputComponent } from '../../components/tag-input/tag-input.component';

describe('TopicFormComponent', () => {
  let component: TopicFormComponent;
  let fixture: ComponentFixture<TopicFormComponent>;

  let testFormGroupDirective: FormGroupDirective = new FormGroupDirective([], []);;
  let testFormGroup: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    synopsis: new FormControl('', [Validators.required]),
    permission: new FormControl(Permission.PRIVATE, [Validators.required]),
    categories: new FormArray([])
  });
  testFormGroupDirective.form = testFormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule 
      ],
      declarations: [
        TopicFormComponent,
        TagInputComponent
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
    fixture = TestBed.createComponent(TopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
