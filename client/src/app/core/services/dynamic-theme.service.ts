import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicThemeService {
  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {}

  public loadStyle(styleName: string): void {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
    
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
