import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarButtonGroupComponent } from './toolbar-button-group.component';

describe('ToolbarButtonGroupComponent', () => {
  let component: ToolbarButtonGroupComponent;
  let fixture: ComponentFixture<ToolbarButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
