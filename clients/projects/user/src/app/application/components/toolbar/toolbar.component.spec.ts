import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';

import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ToolbarComponent } from './toolbar.component';
import { SnDrawerService } from '@sn/drawer';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let drawerService: SnDrawerService;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        KeyboardShortcutsModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [
        ToolbarComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    drawerService = fixture.debugElement.injector.get(SnDrawerService) as any;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    jasmine.clock().install();
  });

  afterEach(() => {
    component.ngOnDestroy();
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open drawer, then close drawer, then reopen drawer when onCreateNewTopic is called', () => {
    spyOn(drawerService, 'close');
    component.onCreateNewTopic(); // opens drawer
    spyOn(drawerService, 'show'); // spy on show after the drawer is open
    component.onCreateNewTopic(); // closes drawer
    jasmine.clock().tick(500);
    expect(drawerService.close).toHaveBeenCalledTimes(1);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should open drawer, then close drawer, then reopen drawer when onCreateNewCalendarEvent is called', () => {
    spyOn(drawerService, 'close');
    component.onCreateNewCalendarEvent(); // opens drawer
    spyOn(drawerService, 'show');         // spy on show after the drawer is open
    component.onCreateNewCalendarEvent(); // closes drawer
    jasmine.clock().tick(500);
    expect(drawerService.close).toHaveBeenCalledTimes(1);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should open drawer, then close drawer, then reopen drawer when onCreateNewDocument is called', () => {
    spyOn(drawerService, 'close');
    component.onCreateNewDocument(); // opens drawer
    spyOn(drawerService, 'show');    // spy on show after the drawer is open
    component.onCreateNewDocument(); // closes drawer
    jasmine.clock().tick(500);
    expect(drawerService.close).toHaveBeenCalledTimes(1);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });
});
