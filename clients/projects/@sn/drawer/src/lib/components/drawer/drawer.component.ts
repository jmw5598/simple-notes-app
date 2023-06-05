import { Component, ComponentFactory, Input, OnInit, OnDestroy, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { fadeAnimation } from '@sn/shared/animations';
import { SnDrawerOverlayStyle } from './drawer-overlay-style.enum';
import { SnDrawerLocation } from './drawer-location.enum';
import { SnDrawerService } from './drawer.service';
import { SnDrawerOptions } from './drawer-options.model';
import { SnDrawerSize } from './drawer-size.enum';

// export type DrawerLocation = 'left' | 'right';
// export type DrawerOverlayStyle = 'transparent' | 'dark' | 'light';
// export type DrawerSize = 'default' | 'small' | 'medium' | 'large' | 'full';

@Component({
  selector: 'sn-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class SnDrawerComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef })
  public drawerContentRef: ViewContainerRef;

  @Input()
  public overlayStyle: SnDrawerOverlayStyle;

  @Input()
  public drawerLocation: SnDrawerLocation;

  @Input()
  public closeOnEscape: boolean;

  @Input()
  public drawerSize: SnDrawerSize;

  public isDrawerVisible: boolean;
  public DrawerLocation = SnDrawerLocation;

  public options: SnDrawerOptions;

  private _drawerServiceSubject$: Subject<void>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _drawerService: SnDrawerService,
  ) {
    this._drawerServiceSubject$ = new Subject<void>();
    // this.drawerLocation = DrawerLocation.RIGHT;
    this.closeOnEscape = true;
  }

  ngOnInit(): void {
    this._drawerService.onDrawerOptionsChange()
      .pipe(
        takeUntil(this._drawerServiceSubject$),
        tap((options: SnDrawerOptions) => this.options = options)
      )
      .subscribe((options: SnDrawerOptions) => this._changeDetectorRef.markForCheck());

    this._drawerService.onDrawerVibilityChange()
      .pipe(
        takeUntil(this._drawerServiceSubject$),
        tap((visible: boolean) => this.isDrawerVisible = visible)  
      )
      .subscribe((visible: boolean) => this._changeDetectorRef.markForCheck());

    this._drawerService.onContentChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((component: Type<any>) => {
        if (component) {
          this._setDrawerContent(component)
        } else {
          this._removeDrawerContent();
        }
        this._changeDetectorRef.markForCheck();
      });
  }

  public close(): void {
    this._drawerService.close();
  }

  private _setDrawerContent(component: Type<any>) {
    const componentFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(component);
    this.drawerContentRef.clear();
    this.drawerContentRef.createComponent(componentFactory);
  }

  private _removeDrawerContent(): void {
    this.drawerContentRef.clear();
  }

  @HostListener('document:keydown.escape', ['$event']) 
  public onKeydownHandler(event: KeyboardEvent) {
    if (this.closeOnEscape) {
      event.preventDefault();
      this._drawerService.close();
    }
  }

  ngOnDestroy() {
    this._drawerServiceSubject$.next();
    this._drawerServiceSubject$.complete();
  }
}
