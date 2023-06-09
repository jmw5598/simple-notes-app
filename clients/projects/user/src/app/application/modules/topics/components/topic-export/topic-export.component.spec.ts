import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';

import { TopicExportComponent } from './topic-export.component';
import { SnDrawerService } from '@sn/drawer';
import { Topic } from '@sn/shared/models';
import { exportTopic } from '../../store/actions';

describe('TopicExportComponent', () => {
  let component: TopicExportComponent;
  let fixture: ComponentFixture<TopicExportComponent>;
  
  const testDrawerService = {
    close() {},
    onDataChange() { return of(EMPTY) }
  };

  const mockSelectedTopic = { id: 1 } as Topic;

  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TopicExportComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: SnDrawerService,
          useValue: testDrawerService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch through default form value and close drawer', () => {
    spyOn(testDrawerService, 'close');
    spyOn(component.form, 'patchValue');
    component.onClose();
    expect(testDrawerService.close).toHaveBeenCalledTimes(1);
    expect(component.form.patchValue).toHaveBeenCalledTimes(1);
  });

  it('should dispatch exportTopic action when onSubmit is called', () => {
    spyOn(testStore, 'dispatch');
    const exportTopicFormValue = component.form.value;
    component.topic = mockSelectedTopic;
    component.onSubmit(exportTopicFormValue);
    expect(testStore.dispatch).toHaveBeenCalledWith(exportTopic({
      topicId: mockSelectedTopic.id,
      config: exportTopicFormValue
    }));
  });
});
