import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroTrash, heroPencil, heroEye, heroDocument, } from '@ng-icons/heroicons/outline';

import { SnPaginatorModule } from '@sn/paginator';
import { SnButtonsModule } from '@sn/button';
import { SnSectionHeaderModule } from '@sn/section-header';

import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardOverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SnPaginatorModule,
    SnButtonsModule,
    SnSectionHeaderModule,
    NgIconsModule.withIcons({
      heroTrash,
      heroPencil,
      heroEye,
      heroDocument,
    }),
  ]
})
export class DashboardModule { }
