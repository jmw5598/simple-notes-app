import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sn-admin-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements OnInit {
  @Input()
  public accounts: Account[];

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onEdit: EventEmitter<Account> = new EventEmitter<Account>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public edit(account: Account): void {
    this.onEdit.emit(account);
  }

  public delete(accountId: number): void {
    this.onDelete.emit(accountId);
  }
}
