import { Component, ComponentFactory, Input, OnInit, OnDestroy, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeAnimation } from '@sn/shared/animations';
import { DrawerOverlayStyle } from './drawer-overlay-style.enum';
import { DrawerLocation } from './drawer-location.enum';
import { DrawerService } from './drawer.service';
import { DrawerOptions } from './drawer-options.model';
import { DEFAULT_DRAWER_OPTIONS } from './drawer-options.defaults';
import { DrawerSize } from './drawer-size.enum';

@Component({
  selector: 'sn-user-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [fadeAnimation]
})
export class DrawerComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef })
  public drawerContentRef: ViewContainerRef;

  @Input()
  public overlayStyle: DrawerOverlayStyle;

  @Input()
  public drawerLocation: DrawerLocation;

  @Input()
  public closeOnEscape: boolean;

  @Input()
  public drawerSize: DrawerSize;

  public isDrawerVisible: boolean;
  public DrawerLocation = DrawerLocation;

  public options: DrawerOptions;

  private _drawerServiceSubject$: Subject<void>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _drawerService: DrawerService
  ) {
    this._drawerServiceSubject$ = new Subject<void>();
    // this.drawerLocation = DrawerLocation.RIGHT;
    this.closeOnEscape = true;
  }

  ngOnInit(): void {
    this._drawerService.onDrawerOptionsChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((options: DrawerOptions) => this.options = options);

    this._drawerService.onDrawerVibilityChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((visible: boolean) => this.isDrawerVisible = visible);

    this._drawerService.onContentChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((component: Type<any>) => {
        if (component) {
          this._setDrawerContent(component)
        } else {
          this._removeDrawerContent();
        }
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
