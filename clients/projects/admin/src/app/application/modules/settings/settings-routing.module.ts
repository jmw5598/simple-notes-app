import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'roles',
        data: { preload: true },
        loadChildren: () => import('./modules/settings-roles/settings-roles.module').then(m => m.SettingsRolesModule)
      },
      {
        path: 'plans',
        data: { preload: true },
        loadChildren: () => import('./modules/settings-plans/settings-plans.module').then(m => m.SettingsPlansModule)
      },
      {
        path: '**',
        redirectTo: 'roles',
        pathMatch: 'full'
      }
    ]
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
export class SettingsRoutingModule { }