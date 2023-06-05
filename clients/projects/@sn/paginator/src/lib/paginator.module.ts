import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnPaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    SnPaginatorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnPaginatorComponent,
  ]
})
export class SnPaginatorModule { }
