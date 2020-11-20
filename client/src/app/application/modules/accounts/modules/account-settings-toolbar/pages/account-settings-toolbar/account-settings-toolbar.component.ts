import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-account-settings-toolbar',
  templateUrl: './account-settings-toolbar.component.html',
  styleUrls: ['./account-settings-toolbar.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsToolbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
