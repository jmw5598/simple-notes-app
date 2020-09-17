import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarSideService } from '../navbar-side/navbar-side.service';
// import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'sn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    // private authenticationService: AuthenticationService,
    private navbarSideSevice: NavbarSideService
  ) {}

  logout() {
    // this.authenticationService.unauthenticate();
    this.router.navigate(['login']);
  }

  toggleSideNav() {
    this.navbarSideSevice.toggle();
  }

}
