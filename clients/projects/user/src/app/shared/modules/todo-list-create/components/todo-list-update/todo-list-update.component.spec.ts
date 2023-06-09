import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnTodoListUpdateComponent } from './todo-list-update.component';

describe('SnTodoListUpdateComponent', () => {
  let component: SnTodoListUpdateComponent;
  let fixture: ComponentFixture<SnTodoListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnTodoListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnTodoListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
