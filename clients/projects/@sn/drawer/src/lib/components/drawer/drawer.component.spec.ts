import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDrawerService } from './drawer.service';
import { SnDrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: SnDrawerComponent;
  let fixture: ComponentFixture<SnDrawerComponent>;
  let drawerService: SnDrawerService;
  const escapeKeyDownEvent = {
    preventDefault: () => {}
  } as KeyboardEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnDrawerComponent
      ],
      providers: [
        SnDrawerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDrawerComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(SnDrawerService);
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
