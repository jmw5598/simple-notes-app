import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansFormComponent } from './plans-form.component';

describe('PlansFormComponent', () => {
  let component: PlansFormComponent;
  let fixture: ComponentFixture<PlansFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
