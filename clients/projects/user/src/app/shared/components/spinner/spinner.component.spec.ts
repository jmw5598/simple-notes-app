import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message in spinner-text element', () => {
    const message: string = 'Loading...';
    component.message = message;
    fixture.detectChanges();

    const spinnerElement: HTMLElement = fixture.nativeElement;
    const spinnerTextElement = spinnerElement.querySelector('.spinner-text');
    
    expect(spinnerTextElement.textContent).toBe(message);
  });
});
