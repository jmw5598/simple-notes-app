import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations'

@Component({
  selector: 'sn-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
