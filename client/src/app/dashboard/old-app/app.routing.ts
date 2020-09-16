import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './authentication/guards/authentication.guard';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'topics',
    canActivate: [AuthenticationGuard],
    loadChildren: 'app/topics/topics.module#TopicsModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    redirectTo: 'topics',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'topics',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'topics',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
