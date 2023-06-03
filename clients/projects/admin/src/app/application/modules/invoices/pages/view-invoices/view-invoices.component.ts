import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-admin-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInvoicesComponent { }
