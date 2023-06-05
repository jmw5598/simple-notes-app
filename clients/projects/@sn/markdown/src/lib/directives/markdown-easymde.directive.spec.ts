import { ElementRef } from '@angular/core';
import { SnMarkdownEasymdeDirective } from './markdown-easymde.directive';

describe('SnMarkdownEasymdeDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new SnMarkdownEasymdeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
