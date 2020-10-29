import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }