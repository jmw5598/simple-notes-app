import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTodosComponent } from './pages/view-todos/view-todos.component';
import { TodosSearchResultGuard } from './guards/todos-search-result.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewTodosComponent,
    canActivate: [TodosSearchResultGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }