import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBuilderTopicContainerComponent } from './document-builder-topic-container.component';

describe('DocumentBuilderTopicContainerComponent', () => {
  let component: DocumentBuilderTopicContainerComponent;
  let fixture: ComponentFixture<DocumentBuilderTopicContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBuilderTopicContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBuilderTopicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
