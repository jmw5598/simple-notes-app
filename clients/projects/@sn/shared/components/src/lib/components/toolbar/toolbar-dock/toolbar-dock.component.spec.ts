import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDockComponent } from './toolbar-dock.component';

describe('ToolbarDockComponent', () => {
  let component: ToolbarDockComponent;
  let fixture: ComponentFixture<ToolbarDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
