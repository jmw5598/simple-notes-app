import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDocumentBuilderDocumentSectionComponent } from './document-builder-document-section.component';

describe('SnDocumentBuilderDocumentSectionComponent', () => {
  let component: SnDocumentBuilderDocumentSectionComponent;
  let fixture: ComponentFixture<SnDocumentBuilderDocumentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDocumentBuilderDocumentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderDocumentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
