import { Component, Input, OnInit } from '@angular/core';
import { NavigationRouteLink } from '@sn/core/framing';

@Component({
  selector: 'sn-admin-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss']
})
export class SettingsNavigationComponent implements OnInit {
  @Input()
  public links: NavigationRouteLink[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
