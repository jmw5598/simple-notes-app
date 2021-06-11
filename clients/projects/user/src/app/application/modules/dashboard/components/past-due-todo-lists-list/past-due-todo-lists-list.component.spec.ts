import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDueTodoListsListComponent } from './past-due-todo-lists-list.component';

describe('PastDueTodoListsListComponent', () => {
  let component: PastDueTodoListsListComponent;
  let fixture: ComponentFixture<PastDueTodoListsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastDueTodoListsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastDueTodoListsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
