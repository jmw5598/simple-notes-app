import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDocumentBuilderDocumentTopicComponent } from './document-builder-document-topic.component';

describe('SnDocumentBuilderDocumentTopicComponent', () => {
  let component: SnDocumentBuilderDocumentTopicComponent;
  let fixture: ComponentFixture<SnDocumentBuilderDocumentTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDocumentBuilderDocumentTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderDocumentTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
