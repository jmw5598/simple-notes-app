import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TopicByIdGuard } from './topic-by-id.guard';

describe('TopicByIdGuard', () => {
  let guard: TopicByIdGuard;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(TopicByIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
