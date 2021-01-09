import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { SharedModule } from '@sn/shared/shared.module';
import { CalendarEventCreateComponent } from './calendar-event-create.component';

describe('CalendarEventCreateComponent', () => {
  let component: CalendarEventCreateComponent;
  let fixture: ComponentFixture<CalendarEventCreateComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TimepickerModule.forRoot()
      ],
      declarations: [
        CalendarEventCreateComponent
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
    fixture = TestBed.createComponent(CalendarEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
