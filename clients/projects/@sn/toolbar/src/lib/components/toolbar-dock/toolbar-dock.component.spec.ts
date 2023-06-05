import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnToolbarDockComponent } from './toolbar-dock.component';

describe('SnToolbarDockComponent', () => {
  let component: SnToolbarDockComponent;
  let fixture: ComponentFixture<SnToolbarDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnToolbarDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnToolbarDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
