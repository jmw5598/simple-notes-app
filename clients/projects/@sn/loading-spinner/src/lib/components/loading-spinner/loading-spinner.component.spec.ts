import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnLoadingSpinnerComponent } from './loading-spinner.component';

describe('SnLoadingSpinnerComponent', () => {
  let component: SnLoadingSpinnerComponent;
  let fixture: ComponentFixture<SnLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnLoadingSpinnerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnLoadingSpinnerComponent);
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
