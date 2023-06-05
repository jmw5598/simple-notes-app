import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnToolbarComponent } from './toolbar.component';

describe('SnToolbarComponent', () => {
  let component: SnToolbarComponent;
  let fixture: ComponentFixture<SnToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
