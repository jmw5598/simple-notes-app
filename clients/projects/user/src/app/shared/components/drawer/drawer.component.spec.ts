import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerService } from './drawer.service';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;
  let drawerService: DrawerService;
  const escapeKeyDownEvent = {
    preventDefault: () => {}
  } as KeyboardEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DrawerComponent
      ],
      providers: [
        DrawerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(DrawerService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    jasmine.clock().install();
    component.ngOnInit();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDrawerVisible to false when DrawerService.show is called', () => {
    drawerService.show(null);
    jasmine.clock().tick(1);
    expect(component.isDrawerVisible).toBeTrue();
  });

  it('should set isDrawerVisible to false when close if called', () => {
    drawerService.show(null);
    component.close();
    jasmine.clock().tick(1);
    expect(component.isDrawerVisible).toBeFalse();
  });

  it('should close drawer on escape key down event when closeOnEscape is set to true', () => {
    component.closeOnEscape = true;
    drawerService.show(null);
    component.onKeydownHandler(escapeKeyDownEvent);
    jasmine.clock().tick(1);
    expect(component.isDrawerVisible).toBeFalse();
  });

  it('should keep drawer open on escape key down event when closeOnEscape is set to false', () => {
    component.closeOnEscape = false;
    drawerService.show(null);
    component.onKeydownHandler(escapeKeyDownEvent);
    jasmine.clock().tick(1);
    expect(component.isDrawerVisible).toBeTrue();
  });

  // TODO test drawer content is rendered when
  // DrawerService.show is called.
});
