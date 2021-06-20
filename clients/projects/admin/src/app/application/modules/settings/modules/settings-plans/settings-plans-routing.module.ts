import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPlansComponent } from './pages/settings-plans/settings-plans.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPlansComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsPlansRoutingModule { }
