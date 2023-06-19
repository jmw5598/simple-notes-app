import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { NgIconsModule } from '@ng-icons/core';
import { heroDocument, heroPencil, heroTrash, heroArrowPath, heroClock } from '@ng-icons/heroicons/outline';

import { SnAlertModule } from '@sn/alert';
import { SnSectionHeaderModule } from '@sn/section-header';
import { SnButtonsModule } from '@sn/button';
import { SnDrawerModule } from '@sn/drawer';
import { SnFormModule } from '@sn/form';
import { SnListModule } from '@sn/list';
import { SnEmptyModule } from '@sn/empty';

import { SettingsRolesRoutingModule } from './settings-roles-routing.module';
import { SettingsRolesComponent } from './pages/settings-roles/settings-roles.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesCreateComponent } from './components/roles-create/roles-create.component';
import { RolesUpdateComponent } from './components/roles-update/roles-update.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';


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
    NgIconsModule.withIcons({ 
      heroDocument,
      heroPencil,
      heroTrash,
      heroArrowPath,
      heroClock,
    }),
    SnAlertModule,
    SnSectionHeaderModule,
    SnButtonsModule,
    SnDrawerModule,
    SnFormModule,
    SnListModule,
    SnEmptyModule,
  ]
})
export class SettingsRolesModule { }
