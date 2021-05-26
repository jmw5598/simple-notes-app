import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysTodoListsListComponent } from './todays-todo-lists-list.component';

describe('TodaysTodoListsListComponent', () => {
  let component: TodaysTodoListsListComponent;
  let fixture: ComponentFixture<TodaysTodoListsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysTodoListsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysTodoListsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
