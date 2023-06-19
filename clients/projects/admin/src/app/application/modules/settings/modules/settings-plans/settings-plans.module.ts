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

import { SettingsPlansRoutingModule } from './settings-plans-routing.module';
import { SettingsPlansComponent } from './pages/settings-plans/settings-plans.component';
import { PlansFormComponent } from './components/plans-form/plans-form.component';
import { PlansCreateComponent } from './components/plans-create/plans-create.component';
import { PlansUpdateComponent } from './components/plans-update/plans-update.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';

@NgModule({
  declarations: [
    SettingsPlansComponent,
    PlansFormComponent,
    PlansCreateComponent,
    PlansUpdateComponent,
    PlansListComponent
  ],
  imports: [
    CommonModule,
    SettingsPlansRoutingModule,
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
export class SettingsPlansModule { }
