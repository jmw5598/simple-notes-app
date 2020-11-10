import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTopicsListComponent } from './recent-topics-list.component';

describe('RecentTopicsListComponent', () => {
  let component: RecentTopicsListComponent;
  let fixture: ComponentFixture<RecentTopicsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTopicsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTopicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
