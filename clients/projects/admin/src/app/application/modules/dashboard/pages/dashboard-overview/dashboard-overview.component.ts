import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '@sn/shared/animations';
import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';

@Component({
  selector: 'sn-admin-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent extends AbstractPageOverlayLoader implements OnInit {

  constructor(
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
  }
}
