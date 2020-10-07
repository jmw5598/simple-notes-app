import { Component, ComponentFactory, Input, OnInit, OnDestroy, Type, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeAnimation } from '../../animations';
import { DrawerOverlayStyle } from './drawer-overlay-style.enum';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'sn-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [fadeAnimation]
})
export class DrawerComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef })
  public drawerContentRef: ViewContainerRef;

  @Input()
  public overlayStyle: DrawerOverlayStyle;

  public isDrawerVisible: boolean;

  private _drawerServiceSubject$: Subject<void>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _drawerService: DrawerService
  ) {
    this._drawerServiceSubject$ = new Subject<void>();
    this.overlayStyle = DrawerOverlayStyle.DIM_DARK
  }

  ngOnInit(): void {
    this._drawerService.onDrawerVibilityChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((visible: boolean) => this.isDrawerVisible = visible);

    this._drawerService.onContentChange()
      .pipe(takeUntil(this._drawerServiceSubject$))
      .subscribe((component: Type<any>) => {
        if (component) 
          this._setDrawerContent(component)
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

  ngOnDestroy() {
    this._drawerServiceSubject$.next();
    this._drawerServiceSubject$.complete();
  }
}
