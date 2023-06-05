import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SettingsPlansRoutingModule } from './settings-plans-routing.module';
import { SettingsPlansComponent } from './pages/settings-plans/settings-plans.component';
import { PlansFormComponent } from './components/plans-form/plans-form.component';
import { PlansCreateComponent } from './components/plans-create/plans-create.component';
import { PlansUpdateComponent } from './components/plans-update/plans-update.component';
import { PlansListComponent } from './components/plans-list/plans-list.component';
import { SnAlertModule } from '@sn/alert';

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
    SnAlertModule,
  ]
})
export class SettingsPlansModule { }
