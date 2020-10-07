import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicExportModalComponent } from './topic-export-modal.component';

describe('TopicExportModalComponent', () => {
  let component: TopicExportModalComponent;
  let fixture: ComponentFixture<TopicExportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicExportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
