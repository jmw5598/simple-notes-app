import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsRolesComponent } from './pages/settings-roles/settings-roles.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsRolesComponent
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
export class SettingsRolesRoutingModule { }
