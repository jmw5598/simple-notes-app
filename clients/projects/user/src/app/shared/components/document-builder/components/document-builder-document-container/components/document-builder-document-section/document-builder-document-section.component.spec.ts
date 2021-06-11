import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuilderDocumentSectionComponent } from './document-builder-document-section.component';

describe('DocumentBuilderDocumentSectionComponent', () => {
  let component: DocumentBuilderDocumentSectionComponent;
  let fixture: ComponentFixture<DocumentBuilderDocumentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuilderDocumentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderDocumentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
