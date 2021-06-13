import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SharedModule } from '@sn/user/shared/shared.module';
import { SectionCreateComponent } from './section-create.component';
import { Section, Topic } from '@sn/shared/models';
import { createSection } from '../../store/actions';
import { SectionFormComponent } from '../section-form/section-form.component';

describe('SectionCreateComponent', () => {
  let component: SectionCreateComponent;
  let fixture: ComponentFixture<SectionCreateComponent>;

  const testStore = {
    select: (selector: any) => of(),
    dispatch: (action: any) => {}
  };

  const mockSection = {
    id: null,
    title: 'Mock Section',
    synopsis: 'Mock Synopsis'
  } as Section;

  const mockSelectedTopic = { id: 1 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        SectionCreateComponent,
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
    fixture = TestBed.createComponent(SectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch through mock section to form and be valid', () => {
    component.form.patchValue({...mockSection});
    expect(component.form.valid).toBeTrue();
  });

  it('should dispatch createSection action when submit is called', () => {
    spyOn(testStore, 'dispatch');
    component.selectedTopic = {...mockSelectedTopic} as Topic;
    component.form.patchValue({...mockSection});
    component.submit(component.form.value);
    const { id, ...expectedEmittedValue } =  mockSection;
    expect(testStore.dispatch).toHaveBeenCalledWith(
      createSection({
        topicId: 1,
        section: expectedEmittedValue as Section  
      })
    );
  });
});
