import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { setSelectedSection } from '../../store/actions';

import { EditSectionNotesComponent } from './edit-section-notes.component';

describe('EditSectionNotesComponent', () => {
  let component: EditSectionNotesComponent;
  let fixture: ComponentFixture<EditSectionNotesComponent>;

  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule
      ],
      declarations: [
        EditSectionNotesComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSaveNotes when onSectionNotesChangeKeyUp is called', () => {
    spyOn(component, 'onSaveSectionNotes');
    const mockEvent = { target: { value: 'Mock Value' } };
    component.onSectionNotesChangeKeyUp(mockEvent);
      jasmine.clock().tick(2000);
    expect(component.onSaveSectionNotes).toHaveBeenCalledTimes(1);
  });

  it('should dispatch setSelectedSection action when ngOnDestroy is called', () => {
    spyOn(testStore, 'dispatch');
    component.ngOnDestroy();
    expect(testStore.dispatch).toHaveBeenCalledWith(
      setSelectedSection({ section: null })
    );
  });

  it('should dispatch updateSectionNotes action when onSaveSectionNotes is called', () => {
    spyOn(testStore, 'dispatch');
    const sectionNotes: string = 'This is sample section notes';
    component.onSaveSectionNotes(sectionNotes);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
