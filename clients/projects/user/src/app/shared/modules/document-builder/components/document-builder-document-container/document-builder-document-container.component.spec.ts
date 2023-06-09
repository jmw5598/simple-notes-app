import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDocumentBuilderDocumentContainerComponent } from './document-builder-document-container.component';

describe('SnDocumentBuilderDocumentContainerComponent', () => {
  let component: SnDocumentBuilderDocumentContainerComponent;
  let fixture: ComponentFixture<SnDocumentBuilderDocumentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDocumentBuilderDocumentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderDocumentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
