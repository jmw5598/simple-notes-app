import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnToasterComponent } from './toaster.component';

describe('ToasterComponent', () => {
  let component: SnToasterComponent;
  let fixture: ComponentFixture<SnToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
