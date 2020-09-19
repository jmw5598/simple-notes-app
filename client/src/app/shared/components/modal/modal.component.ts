import { 
  Component, OnInit, OnDestroy, Input, Type, ComponentFactoryResolver, 
  ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from './modal.service';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'sn-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fadeAnimation]
})
export class ModalComponent implements OnInit {
  @ViewChild('content', { read: ViewContainerRef }) 
  public modalContentRef: ViewContainerRef;

  public isModalVisible: boolean;

  private _subscriptionSubject$: Subject<void>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver, 
    private _modalService: ModalService
  ) { 
    this._subscriptionSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._modalService.onModalVibilityChange()
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((visible: boolean) => this.isModalVisible = visible);

    this._modalService.onContentChange()
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((component: Type<any>) => this._setPanelContent(component));
  }

  public close(): void {
    this._modalService.close();
  }

  private _setPanelContent(component: Type<any>) {
    const componentFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(component);
    this.modalContentRef.clear();
    this.modalContentRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
