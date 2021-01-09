import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TopicSearchComponent } from './topic-search.component';
import { DrawerService } from '../drawer/drawer.service';

describe('TopicSearchComponent', () => {
  let component: TopicSearchComponent;
  let fixture: ComponentFixture<TopicSearchComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TopicSearchComponent
      ],
      providers: [
        DrawerService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
