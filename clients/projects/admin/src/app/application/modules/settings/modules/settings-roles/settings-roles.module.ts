import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SettingsRolesRoutingModule } from './settings-roles-routing.module';
import { SettingsRolesComponent } from './pages/settings-roles/settings-roles.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesCreateComponent } from './components/roles-create/roles-create.component';
import { RolesUpdateComponent } from './components/roles-update/roles-update.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { SnAlertModule } from '@sn/alert';

@NgModule({
  declarations: [
    SettingsRolesComponent,
    RolesFormComponent,
    RolesCreateComponent,
    RolesUpdateComponent,
    RolesListComponent
  ],
  imports: [
    CommonModule,
    SettingsRolesRoutingModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    SnAlertModule,
  ]
})
export class SettingsRolesModule { }
