import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionComponent } from './update-section.component';

describe('UpdateSectionComponent', () => {
  let component: UpdateSectionComponent;
  let fixture: ComponentFixture<UpdateSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
