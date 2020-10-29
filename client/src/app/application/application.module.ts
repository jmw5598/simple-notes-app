import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    NavbarComponent,
    NavbarSideComponent,
    NavigationComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
