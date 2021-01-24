import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Topic } from '@sn/shared/models';

import { SharedModule } from '@sn/shared/shared.module';
import { of } from 'rxjs';
import { updateTopic } from '../../store/actions';
import { TopicUpdateComponent } from './topic-update.component';

fdescribe('TopicUpdateComponent', () => {
  let component: TopicUpdateComponent;
  let fixture: ComponentFixture<TopicUpdateComponent>;

  const testStore = {
    select: (selector: any) => of({}),
    dispatch: (action: any) => {}
  }

  const mockTopic = {
    id: 1,
    title: 'Mock Title',
    synopsis: 'Mock Synopsis'
  } as Topic;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [
        TopicUpdateComponent
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
    fixture = TestBed.createComponent(TopicUpdateComponent);
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

  it('should dispatch updateTopic action when submit is called', () => {
    spyOn(testStore, 'dispatch');
    component.submit(mockTopic);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      updateTopic({
        id: mockTopic.id,
        topic: mockTopic
      })
    )
  });
});
