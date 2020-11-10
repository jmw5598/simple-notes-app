import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
