import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { mockTopics } from '@sn/application/modules/documents/pages/document-builder/topics-data.mock';
import { Section, Topic } from '@sn/shared/models';
import { BehaviorSubject, of } from 'rxjs';

import { SharedModule } from '@sn/shared/shared.module';
import { TopicDetailsComponent } from './topic-details.component';
import { DrawerService } from '@sn/shared/components';

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  const mockSection = {
    id: 2 ,
    title: 'Mock Title',
    synopsis: 'Mock Synopsis'
  } as Section;

  const mockTopic = {
    id: 1
  } as Topic;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable() },
    dispatch: function(action: any) { this._data.next(action); }
  }

  const testDrawerService = {
    show(component: any) {},
    close() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ], declarations: [
        TopicDetailsComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: DrawerService,
          useValue: testDrawerService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteSection action when onDeleteSection is called', () => {
    spyOn(testStore, 'dispatch');
    component.onDeleteSection(mockSection.id);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch searchSections action when onSearchSections is called', () => {
    spyOn(testStore, 'dispatch');
    const searchTerm: string = 'testing';
    component.onSearchSections(searchTerm);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  // TODO figure out the component level providers causing this to fail.
  // it('should show drawer when onDeleteSection is called with sectionId', () => {
  //   const sectionId: number = 1;
  //   spyOn(testDrawerService, 'show');
  //   component.onDeleteSection(sectionId);
  //   expect(testDrawerService.show).toHaveBeenCalled();
  // });
});
