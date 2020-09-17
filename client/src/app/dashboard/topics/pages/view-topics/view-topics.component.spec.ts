import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicsComponent } from './view-topics.component';

describe('ViewTopicsComponent', () => {
  let component: ViewTopicsComponent;
  let fixture: ComponentFixture<ViewTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
