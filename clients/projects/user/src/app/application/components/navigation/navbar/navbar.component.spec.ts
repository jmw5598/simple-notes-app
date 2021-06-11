import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { SharedModule } from '@sn/shared/shared.module';
import { LayoutService, LayoutSidePanelState } from '@sn/shared/components';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let layoutService: LayoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ 
        NavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(layoutService, 'changeState');
    component.ngOnInit();
  });

  it('should call LayoutSerivce.changeState with LayoutSidePanelState.CLOSE when screen with is < 768 and side panel is open', () => {
    const mockWindowResizeEvent = { target: { innerWidth: 767 } };
    component.currentLayoutSidePanelState = LayoutSidePanelState.OPEN;
    component.onResize(mockWindowResizeEvent);
    component.toggleSideNav();
    expect(layoutService.changeState).toHaveBeenCalledWith(LayoutSidePanelState.CLOSE);
  });

  it('should call LayoutSerivce.changeState with LayoutSidePanelState.COLLAPSE when screen with is >= 768 and side panel is open', () => {
    const mockWindowResizeEvent = { target: { innerWidth: 769 } };
    component.currentLayoutSidePanelState = LayoutSidePanelState.OPEN;
    component.onResize(mockWindowResizeEvent);
    component.toggleSideNav();
    expect(layoutService.changeState).toHaveBeenCalledWith(LayoutSidePanelState.COLLAPSE);
  });

  it('should call LayoutSerivce.changeState with LayoutSidePanelState.OPEN when side panel is collapsed', () => {
    component.currentLayoutSidePanelState = LayoutSidePanelState.COLLAPSE;
    component.toggleSideNav();
    expect(layoutService.changeState).toHaveBeenCalledWith(LayoutSidePanelState.OPEN);
  });

  it('should call LayoutSerivce.changeState with LayoutSidePanelState.OPEN when side panel is collapsed', () => {
    component.currentLayoutSidePanelState = LayoutSidePanelState.CLOSE;
    component.toggleSideNav();
    expect(layoutService.changeState).toHaveBeenCalledWith(LayoutSidePanelState.OPEN);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});