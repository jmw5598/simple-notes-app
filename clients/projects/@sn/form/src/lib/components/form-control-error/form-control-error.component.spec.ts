import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFormControlErrorComponent } from './form-control-error.component';

describe('SnFormControlErrorComponent', () => {
  let component: SnFormControlErrorComponent;
  let fixture: ComponentFixture<SnFormControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnFormControlErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnFormControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
