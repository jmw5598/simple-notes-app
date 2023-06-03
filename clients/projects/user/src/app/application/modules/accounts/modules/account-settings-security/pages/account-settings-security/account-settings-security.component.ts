import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-user-account-settings-security',
  templateUrl: './account-settings-security.component.html',
  styleUrls: ['./account-settings-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AccountSettingsSecurityComponent { }
