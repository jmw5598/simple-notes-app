import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarSideComponent } from './navbar-side.component';

describe('NavbarSideComponent', () => {
  let component: NavbarSideComponent;
  let fixture: ComponentFixture<NavbarSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarSideComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
