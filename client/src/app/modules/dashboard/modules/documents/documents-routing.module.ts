import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentBuilderComponent } from './pages/document-builder/document-builder.component';

const routes: Routes = [
  {
    path: 'builder',
    component: DocumentBuilderComponent
  },
  {
    path: '**',
    redirectTo: 'builder',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
