import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-account-settings-security',
  templateUrl: './account-settings-security.component.html',
  styleUrls: ['./account-settings-security.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsSecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
