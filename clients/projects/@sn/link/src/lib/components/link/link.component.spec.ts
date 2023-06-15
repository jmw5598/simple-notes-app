import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnLinkComponent } from './link.component';

describe('SnLinkComponent', () => {
  let component: SnLinkComponent;
  let fixture: ComponentFixture<SnLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
