import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    NavbarSideComponent, 
    NavigationComponent, ToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: [
    NavbarSideComponent
  ]
})
export class DashboardModule { }
