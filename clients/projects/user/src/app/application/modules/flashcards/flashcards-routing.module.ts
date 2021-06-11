import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFlashcardsComponent } from './pages/view-flashcards/view-flashcards.component';
import { FlashcardsSearchResultGuard } from './guards/flashcards-search-result.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewFlashcardsComponent,
    canActivate: [FlashcardsSearchResultGuard]
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
export class FlashcardsRoutingModule { }
