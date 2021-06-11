import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from '@sn/user/shared/shared.module';
import { of } from 'rxjs';
import { SectionUpdateComponent } from './section-update.component';
import { SectionFormComponent } from '../section-form/section-form.component';
import { Section, Topic } from '@sn/user/shared/models';
import { updateSection } from '../../store/actions';

describe('SectionUpdateComponent', () => {
  let component: SectionUpdateComponent;
  let fixture: ComponentFixture<SectionUpdateComponent>;
  
  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  };

  const mockSelectedTopic = { id: 1 } as Topic;

  const mockSection = {
    id: 1,
    title: 'Mock Section',
    synopsis: 'Mock Synopsis'
  } as Section;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        SectionUpdateComponent,
        SectionFormComponent
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
    fixture = TestBed.createComponent(SectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch through mock section to form', () => {
    component.form.patchValue({...mockSection});
    expect(component.form.valid).toBeTrue();
    expect(component.form.value).toEqual(mockSection);
  });

  it('should dispatch updateSection action when submit is called', () => {
    spyOn(testStore, 'dispatch');
    component.selectedTopic = mockSelectedTopic
    component.submit(mockSection);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      updateSection({
        topicId: mockSelectedTopic.id,
        sectionId: mockSection.id,
        section: mockSection 
      })
    );
  });
});
