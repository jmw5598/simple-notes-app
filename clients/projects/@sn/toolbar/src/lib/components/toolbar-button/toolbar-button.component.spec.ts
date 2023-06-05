import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnToolbarButtonComponent } from './toolbar-button.component';

describe('SnToolbarButtonComponent', () => {
  let component: SnToolbarButtonComponent;
  let fixture: ComponentFixture<SnToolbarButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnToolbarButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnToolbarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
