import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnTodoListProgressComponent } from './todo-list-progress.component';

describe('SnTodoListProgressComponent', () => {
  let component: SnTodoListProgressComponent;
  let fixture: ComponentFixture<SnTodoListProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnTodoListProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnTodoListProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
