import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopicFormComponent } from './topic-form.component';

describe('TopicFormComponent', () => {
  let component: TopicFormComponent;
  let fixture: ComponentFixture<TopicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule 
      ],
      declarations: [
        TopicFormComponent
      ],
      providers: [
        ControlContainer
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
