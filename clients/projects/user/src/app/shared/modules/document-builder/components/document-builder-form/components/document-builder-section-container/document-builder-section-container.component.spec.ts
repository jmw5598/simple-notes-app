import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDocumentBuilderSectionContainerComponent } from './document-builder-section-container.component';

describe('SnDocumentBuilderSectionContainerComponent', () => {
  let component: SnDocumentBuilderSectionContainerComponent;
  let fixture: ComponentFixture<SnDocumentBuilderSectionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDocumentBuilderSectionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderSectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
