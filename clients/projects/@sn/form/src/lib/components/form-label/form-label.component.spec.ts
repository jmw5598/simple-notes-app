import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFormLabelComponent } from './form-label.component';

describe('SnFormLabelComponent', () => {
  let component: SnFormLabelComponent;
  let fixture: ComponentFixture<SnFormLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnFormLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnFormLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
