import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDocumentBuilderTopicContainerComponent } from './document-builder-topic-container.component';

describe('SnDocumentBuilderTopicContainerComponent', () => {
  let component: SnDocumentBuilderTopicContainerComponent;
  let fixture: ComponentFixture<SnDocumentBuilderTopicContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDocumentBuilderTopicContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDocumentBuilderTopicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
