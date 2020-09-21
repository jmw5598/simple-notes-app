import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicComponent } from './update-topic.component';

describe('UpdateTopicComponent', () => {
  let component: UpdateTopicComponent;
  let fixture: ComponentFixture<UpdateTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
