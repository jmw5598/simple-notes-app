import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnFormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
  let component: SnFormGroupComponent;
  let fixture: ComponentFixture<SnFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
