import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayLoaderService } from './overlay-loader.service';

@Component({
  template: ``
})
export abstract class AbstractPageOverlayLoader implements AfterViewInit {
  public isPageLoading$: Observable<boolean>
  
  constructor(protected _overlayLoaderService: OverlayLoaderService) {
    this.isPageLoading$ = this._overlayLoaderService.onLoadingStateChanges();
  }

  ngAfterViewInit(): void {
    this._overlayLoaderService.setLoadingState(false);
  }
}
