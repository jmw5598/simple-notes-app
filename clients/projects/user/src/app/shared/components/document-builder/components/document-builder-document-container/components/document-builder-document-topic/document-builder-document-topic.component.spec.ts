import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuilderDocumentTopicComponent } from './document-builder-document-topic.component';

describe('DocumentBuilderDocumentTopicComponent', () => {
  let component: DocumentBuilderDocumentTopicComponent;
  let fixture: ComponentFixture<DocumentBuilderDocumentTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuilderDocumentTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderDocumentTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
