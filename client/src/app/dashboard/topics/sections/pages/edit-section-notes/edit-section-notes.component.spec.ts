import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectionNotesComponent } from './edit-section-notes.component';

describe('EditSectionNotesComponent', () => {
  let component: EditSectionNotesComponent;
  let fixture: ComponentFixture<EditSectionNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSectionNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
