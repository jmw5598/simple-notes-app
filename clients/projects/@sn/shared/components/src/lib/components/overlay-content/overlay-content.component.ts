import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, HostListener, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { OverlayContentOptions } from './overlay-content-options.model';
import { OverlayContentService } from './overlay-content.service';

@Component({
  selector: 'sn-overlay-content',
  templateUrl: './overlay-content.component.html',
  styleUrls: ['./overlay-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class OverlayContentComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef, static: false })
  public overlayContentRef: ViewContainerRef;

  public isContentVisible: boolean;

  public options: OverlayContentOptions;

  private _subscriptionSubject$: Subject<void>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _overlayContentService: OverlayContentService
  ) {
    this._subscriptionSubject$ = new Subject<void>();    
  }

  ngOnInit(): void {
    this._overlayContentService.onOptionsChange()
      .pipe(
        takeUntil(this._subscriptionSubject$),
        tap((options: OverlayContentOptions) => this.options = options)
      )
      .subscribe((options: OverlayContentOptions) => this._changeDetectorRef.markForCheck());

    this._overlayContentService.onVibilityChange()
      .pipe(
        takeUntil(this._subscriptionSubject$),
        tap((visible: boolean) => this.isContentVisible = visible)   
      )
      .subscribe((visible: boolean) => this._changeDetectorRef.markForCheck());

    this._overlayContentService.onContentChange()
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((component: Type<any>) => {
        if (component) {
          this._setOverlayContent(component)
        } else {
          this._removeOverlayContent();
        }
        setTimeout(() => this._changeDetectorRef.markForCheck());
      });
  }

  public close($event: any): void {
    if (($event?.srcElement?.className || '')?.includes('overlay') && this.options.closeOnOverlayClick) {
      this._overlayContentService.close();
    }
  }

  public forceClose(): void {
    this._overlayContentService?.close();
  }

  private _setOverlayContent(component: Type<any>) {
    setTimeout(() => {
      const componentFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(component);
      this.overlayContentRef?.clear();
      this.overlayContentRef?.createComponent(componentFactory);
    });
  }

  private _removeOverlayContent(): void {
      this.overlayContentRef?.clear();
  }

  @HostListener('document:keydown.escape', ['$event']) 
  public onKeydownHandler(event: KeyboardEvent) {
    if (this.options?.closeOnEscape) {
      event.preventDefault();
      this._overlayContentService.close();
    }
  }

  ngOnDestroy(): void {
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
