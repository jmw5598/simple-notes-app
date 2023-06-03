import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Account, Profile } from '@sn/shared/models';

@Component({
  selector: 'sn-user-account-user-card',
  templateUrl: './account-user-card.component.html',
  styleUrls: ['./account-user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountUserCardComponent {
  @Input()
  public account: Account;
  
  @Input()
  public profile: Profile;
}
