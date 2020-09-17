import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicsComponent } from './create-topics.component';

describe('CreateTopicsComponent', () => {
  let component: CreateTopicsComponent;
  let fixture: ComponentFixture<CreateTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
