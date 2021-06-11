import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '@sn/user/core/models';
import { fadeAnimation } from '@sn/user/shared/animations'

@Component({
  selector: 'sn-user-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.scss'],
  animations: [fadeAnimation]
})
export class AccountDetailsDisplayComponent implements OnInit {
  @Input()
  public profile: Profile;

  constructor() { }

  ngOnInit(): void {
  }
}
