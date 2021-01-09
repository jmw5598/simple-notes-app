import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';

import { SharedModule } from '@sn/shared/shared.module';
import { of } from 'rxjs';
import { TopicUpdateComponent } from './topic-update.component';

describe('TopicUpdateComponent', () => {
  let component: TopicUpdateComponent;
  let fixture: ComponentFixture<TopicUpdateComponent>;
  const testStore = {
    select: () => of({}),
    dispatch: () => {}
  }

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
