import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations'

@Component({
  selector: 'sn-user-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AccountDetailsDisplayComponent {
  @Input()
  public profile: Profile;
}
