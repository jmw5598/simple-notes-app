import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { SharedModule } from '@sn/shared/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { DrawerService } from '@sn/shared/components';
import { Type } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let drawerService: DrawerService;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  const testDrawerService = {
    show(component: Type<any>) {}
  } as Partial<DrawerService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KeyboardShortcutsModule,
        SharedModule
      ],
      declarations: [
        ToolbarComponent
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
    fixture = TestBed.createComponent(ToolbarComponent);
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

  // TODO Figure out hwy the spyOn's dont work for these tests!
  
  it('should call DrawerService.show when onCreateNewTopic is called and the drawer is closed', () => {
    spyOn(testDrawerService, 'show');
    component.onCreateNewTopic();
    expect(testDrawerService.show).toHaveBeenCalled();
  });

  // it('should close drawer before calling DrawerService.show when onCreateNewTopic is called and the drawer is closed', () => {
  //   // spyOn(drawerService, 'show');
    
  //   // fail();
  // });

  // it('should call DrawerService.show when onCreateNewCalendarEvent is called and the drawer is closed', () => {
  //   spyOn(drawerService, 'show');
  //   component.onCreateNewCalendarEvent();
  //   expect(drawerService.show).toHaveBeenCalledTimes(1);
  // });

  // it('should close drawer before calling DrawerService.show when onCreateNewCalendarEvent is called and the drawer is closed', () => {
  //   // spyOn(drawerService, 'show');
    
  //   // fail();
  // });

  // it('should call DrawerService.show when onSearchTopics is called and the drawer is closed', () => {
  //   spyOn(drawerService, 'show');
  //   component.onSearchTopics();
  //   expect(drawerService.show).toHaveBeenCalledTimes(1);
  // });

  // it('should close drawer before calling DrawerService.show when onSearchTopics is called and the drawer is closed', () => {
  //   // spyOn(drawerService, 'show');
    
  //   // fail();
  // });
});
