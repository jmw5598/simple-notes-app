import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NavbarSideService } from './navbar-side.service';

@Component({
  selector: 'sn-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements OnInit {
  public isShown$: Observable<boolean>;

  constructor(
    private navbarSideService: NavbarSideService,
  ) { }

  ngOnInit() {
    this.isShown$ = this.navbarSideService.shown;
  }
}
