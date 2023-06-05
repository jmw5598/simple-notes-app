import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnCheckboxComponent } from './checkbox.component';

describe('SnCheckboxComponent', () => {
  let component: SnCheckboxComponent;
  let fixture: ComponentFixture<SnCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
