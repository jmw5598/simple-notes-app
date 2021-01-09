import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner text in spinner-text class element', () => {
    const text: string = 'Heading...';
    component.text = text;
    fixture.detectChanges();

    const spinnerElement: HTMLElement = fixture.nativeElement;
    const spinnerTextElement = spinnerElement.querySelector('.spinner-text');
    
    expect(spinnerTextElement.textContent).toBe(text);
  });
});
