import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDocumentsComponent } from './pages/view-documents/view-documents.component';
import { DocumentsSearchResultGuard } from './guards/documents-search-result.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewDocumentsComponent,
    canActivate: [DocumentsSearchResultGuard]
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
export class DocumentsRoutingModule { }
