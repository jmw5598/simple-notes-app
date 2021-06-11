import { Component, OnInit, Input } from '@angular/core';
import { fadeAnimation } from '../../animations';
import { OverlaySpinnerSize } from './overlay-spinner-size.enum';
import { OverlayLoaderStyle } from './overlay-loader-style.enum';
import { OverlayLoaderService } from './overlay-loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-user-overlay-loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.scss'],
  animations: [fadeAnimation]
})
export class OverlayLoaderComponent implements OnInit {
  @Input()
  public overlayStyle: OverlayLoaderStyle;

  @Input()
  public spinnerSize: OverlaySpinnerSize;

  public isLoading$: Observable<boolean>;

  constructor(private _overlayLoaderService: OverlayLoaderService) {
    this.spinnerSize = OverlaySpinnerSize.MEDIUM;
    this.overlayStyle = OverlayLoaderStyle.DIM_DARK;
  }

  ngOnInit(): void {
    this.isLoading$ = this._overlayLoaderService.onLoadingStateChanges();
  }
}
