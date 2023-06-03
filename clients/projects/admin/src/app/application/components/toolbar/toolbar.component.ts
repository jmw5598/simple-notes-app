import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountCreateComponent } from '@sn/admin/shared/components';
import { DrawerService, DrawerLocation, DrawerSize } from '@sn/shared/components';

@Component({
  selector: 'sn-admin-global-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawerService]
})
export class ToolbarComponent {
  public readonly DrawerLocation = DrawerLocation;
  public readonly tooltipDelay: number = 500;

  constructor(
    private _drawerService: DrawerService
  ) { }

  public onPreviousRoute(): void {
    window.history.back();
  }

  public onNextRoute(): void {
    window.history.forward();
  }

  public onCreateUserAccount(): void {
    this._drawerService.show(AccountCreateComponent, {
      size: DrawerSize.LARGE
    });
  }
}
