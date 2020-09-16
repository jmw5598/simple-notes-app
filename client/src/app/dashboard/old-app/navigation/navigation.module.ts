import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarSideService } from './navbar-side/navbar-side.service';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule],
  exports: [NavigationComponent],
  declarations: [NavbarComponent, NavbarSideComponent, NavigationComponent],
  providers: [NavbarSideService]
})
export class NavigationModule {}
