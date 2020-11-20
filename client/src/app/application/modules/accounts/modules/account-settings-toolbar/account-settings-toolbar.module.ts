import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsToolbarRoutingModule } from './account-settings-toolbar-routing.module';
import { AccountSettingsToolbarComponent } from './pages/account-settings-toolbar/account-settings-toolbar.component';
import { ToolbarKeyboardShortcutListComponent } from './components/toolbar-keyboard-shortcut-list/toolbar-keyboard-shortcut-list.component';

@NgModule({
  declarations: [
    AccountSettingsToolbarComponent,
    ToolbarKeyboardShortcutListComponent
  ],
  imports: [
    AccountSettingsToolbarRoutingModule,
    CommonModule
  ]
})
export class AccountSettingsToolbarModule { }
