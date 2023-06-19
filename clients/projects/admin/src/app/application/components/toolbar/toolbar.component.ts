import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountCreateComponent } from '@sn/admin/shared/modules/account-create';
import { SnDrawerService, SnDrawerLocation, SnDrawerSize } from '@sn/drawer';

@Component({
  selector: 'sn-admin-global-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnDrawerService]
})
export class ToolbarComponent {
  public readonly SnDrawerLocation = SnDrawerLocation;
  public readonly tooltipDelay: number = 500;

  constructor(
    private _drawerService: SnDrawerService
  ) { }

  public onPreviousRoute(): void {
    window.history.back();
  }

  public onNextRoute(): void {
    window.history.forward();
  }

  public onCreateUserAccount(): void {
    this._drawerService.show(AccountCreateComponent, {
      size: SnDrawerSize.LARGE
    });
  }
}
