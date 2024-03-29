import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggingInComponent } from './pages/logging-in/logging-in.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordRequestComponent } from './pages/password-request/password-request.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlansGuard } from '@sn/user/core/guards';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'logging-in',
    component: LoggingInComponent
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'password-request',
        component: PasswordRequestComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      },
      {
        path: 'register',
        canActivate: [PlansGuard],
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login',
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
export class AuthRoutingModule { }
