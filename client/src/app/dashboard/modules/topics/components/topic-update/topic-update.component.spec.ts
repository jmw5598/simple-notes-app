import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicUpdateComponent } from './topic-update.component';

describe('TopicUpdateComponent', () => {
  let component: TopicUpdateComponent;
  let fixture: ComponentFixture<TopicUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
