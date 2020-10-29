import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '@sn/core/models';
import { fadeAnimation } from '@sn/shared/animations'

@Component({
  selector: 'sn-account-details-display',
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
