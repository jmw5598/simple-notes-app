import { Component, OnInit, Input } from '@angular/core';
import { Account, Profile } from '@sn/shared/models';

@Component({
  selector: 'sn-user-account-user-card',
  templateUrl: './account-user-card.component.html',
  styleUrls: ['./account-user-card.component.scss']
})
export class AccountUserCardComponent implements OnInit {
  @Input()
  public account: Account;
  
  @Input()
  public profile: Profile;

  constructor() { }

  ngOnInit(): void {
  }
}
