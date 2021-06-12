import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInvoicesComponent } from './pages/view-invoices/view-invoices.component';

import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  declarations: [
    ViewInvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
