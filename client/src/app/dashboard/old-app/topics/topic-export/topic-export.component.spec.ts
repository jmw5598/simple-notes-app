import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicExportComponent } from './topic-export.component';

describe('TopicExportComponent', () => {
  let component: TopicExportComponent;
  let fixture: ComponentFixture<TopicExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
