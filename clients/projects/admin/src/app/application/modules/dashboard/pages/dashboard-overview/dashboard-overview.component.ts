import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeAnimation } from '@sn/shared/animations';
import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';

@Component({
  selector: 'sn-admin-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent extends AbstractPageOverlayLoader {

  constructor(
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }
}
