import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFormControlComponent } from './form-control.component';

describe('SnFormControlComponent', () => {
  let component: SnFormControlComponent;
  let fixture: ComponentFixture<SnFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
