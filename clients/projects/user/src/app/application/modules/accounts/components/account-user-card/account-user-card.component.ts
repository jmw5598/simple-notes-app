import { Component, OnInit, Input } from '@angular/core';
import { Account, Profile } from '@sn/core/models';

@Component({
  selector: 'sn-account-user-card',
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
