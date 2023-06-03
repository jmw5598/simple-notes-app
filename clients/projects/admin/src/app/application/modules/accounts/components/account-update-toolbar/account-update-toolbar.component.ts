import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sn-admin-account-update-toolbar',
  templateUrl: './account-update-toolbar.component.html',
  styleUrls: ['./account-update-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountUpdateToolbarComponent {
  public resendValidationEmail(): void {
    console.log('resending validation email');
  }
}
