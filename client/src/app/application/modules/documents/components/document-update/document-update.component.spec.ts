import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdateComponent } from './document-update.component';

describe('DocumentUpdateComponent', () => {
  let component: DocumentUpdateComponent;
  let fixture: ComponentFixture<DocumentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
