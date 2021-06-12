import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AccountSettingsToolbarRoutingModule } from './account-settings-toolbar-routing.module';
import { AccountSettingsToolbarComponent } from './pages/account-settings-toolbar/account-settings-toolbar.component';
import { ToolbarKeyboardShortcutListComponent } from './components/toolbar-keyboard-shortcut-list/toolbar-keyboard-shortcut-list.component';
import { ConfigureKeyboardShortcutComponent } from './components/configure-keyboard-shortcut/configure-keyboard-shortcut.component';

import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    AccountSettingsToolbarComponent,
    ToolbarKeyboardShortcutListComponent,
    ConfigureKeyboardShortcutComponent
  ],
  imports: [
    SharedComponentsModule,
    AccountSettingsToolbarRoutingModule,
    CommonModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      popoverMessage: 'Are you sure?',
      cancelButtonType: 'btn-default btn-sm bg-secondary',
      confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
    }),
  ],
  entryComponents: [
    ConfigureKeyboardShortcutComponent
  ]
})
export class AccountSettingsToolbarModule { }
