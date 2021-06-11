import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuilderSectionContainerComponent } from './document-builder-section-container.component';

describe('DocumentBuilderSectionContainerComponent', () => {
  let component: DocumentBuilderSectionContainerComponent;
  let fixture: ComponentFixture<DocumentBuilderSectionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuilderSectionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderSectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
