import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnToolbarButtonGroupComponent } from './toolbar-button-group.component';

describe('SnToolbarButtonGroupComponent', () => {
  let component: SnToolbarButtonGroupComponent;
  let fixture: ComponentFixture<SnToolbarButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnToolbarButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnToolbarButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
