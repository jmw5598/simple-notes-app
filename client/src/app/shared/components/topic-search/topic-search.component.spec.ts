import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSearchComponent } from './topic-search.component';

describe('TopicSearchComponent', () => {
  let component: TopicSearchComponent;
  let fixture: ComponentFixture<TopicSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
