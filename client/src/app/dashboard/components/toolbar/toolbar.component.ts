import { Component, OnInit } from '@angular/core';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { NavbarSideComponent } from '../navigation/navbar-side/navbar-side.component';

@Component({
  selector: 'sn-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [DrawerService]
})
export class ToolbarComponent implements OnInit {
  public DrawerLocation = DrawerLocation;

  constructor(private _drawerService: DrawerService) { }

  ngOnInit(): void {
  }

  public onCreateNewTopic(): void {
    this._drawerService.show(NavbarSideComponent);
  }

  public onCreateNewCalendarEvent(): void {
    this._drawerService.show(NavbarSideComponent);
  }

  public onSearchTopics(): void {
    this._drawerService.show(NavbarSideComponent);
  }
}
