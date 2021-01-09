import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SharedModule } from '@sn/shared/shared.module'
import { EMPTY, of } from 'rxjs';
import { CalendarEventViewComponent } from './calendar-event-view.component';

describe('CalendarEventViewComponent', () => {
  let component: CalendarEventViewComponent;
  let fixture: ComponentFixture<CalendarEventViewComponent>;
  
  const testStore = {
    select: () => {
      return of(EMPTY)
    },
    dispatch: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        CalendarEventViewComponent
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
    fixture = TestBed.createComponent(CalendarEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
