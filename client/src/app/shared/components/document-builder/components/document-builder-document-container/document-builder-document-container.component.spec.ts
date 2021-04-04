import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuilderDocumentContainerComponent } from './document-builder-document-container.component';

describe('DocumentBuilderDocumentContainerComponent', () => {
  let component: DocumentBuilderDocumentContainerComponent;
  let fixture: ComponentFixture<DocumentBuilderDocumentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuilderDocumentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderDocumentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
