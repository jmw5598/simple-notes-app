import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarSideComponent } from '../navbar-side/navbar-side.component';
import { DrawerService, DrawerLocation } from '@sn/shared/components';

@Component({
  selector: 'sn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DrawerService]
})
export class NavbarComponent {
  public DrawerLocation = DrawerLocation;

  constructor(
    private router: Router,
    private _drawerService: DrawerService
  ) {}

  logout() {
    this.router.navigate(['login']);
  }

  toggleSideNav() {
    this._drawerService.show(NavbarSideComponent);
  }
}
