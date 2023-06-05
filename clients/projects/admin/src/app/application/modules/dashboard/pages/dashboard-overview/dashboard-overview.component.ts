import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent { }
