import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-account-settings-integrations',
  templateUrl: './account-settings-integrations.component.html',
  styleUrls: ['./account-settings-integrations.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsIntegrationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
