import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '@sn/shared/models';

@Component({
  selector: 'sn-admin-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListComponent {
  @Input()
  public accounts: Account[];

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onView: EventEmitter<Account> = new EventEmitter<Account>();

  @Output()
  public onEdit: EventEmitter<Account> = new EventEmitter<Account>();

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>();

  public create(): void {
    this.onCreate.emit();
  }

  public view(account: Account): void {
    this.onView.emit(account);
  }

  public edit(account: Account): void {
    this.onEdit.emit(account);
  }

  public delete(accountId: number): void {
    this.onDelete.emit(accountId);
  }
}
