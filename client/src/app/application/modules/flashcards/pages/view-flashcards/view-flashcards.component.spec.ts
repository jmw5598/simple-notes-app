import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlashcardsComponent } from './view-flashcards.component';

describe('ViewFlashcardsComponent', () => {
  let component: ViewFlashcardsComponent;
  let fixture: ComponentFixture<ViewFlashcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFlashcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
