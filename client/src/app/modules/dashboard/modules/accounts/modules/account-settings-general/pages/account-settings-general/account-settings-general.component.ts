import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-account-settings-general',
  templateUrl: './account-settings-general.component.html',
  styleUrls: ['./account-settings-general.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsGeneralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
