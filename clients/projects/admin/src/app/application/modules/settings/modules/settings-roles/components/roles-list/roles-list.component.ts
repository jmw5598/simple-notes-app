import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Role } from '@sn/shared/models';

@Component({
  selector: 'sn-admin-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesListComponent {
  @Input()
  public roles: Role[];

  @Output()
  public onEdit: EventEmitter<Role> = new EventEmitter<Role>();

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onUndelete: EventEmitter<number> = new EventEmitter<number>();

  public edit(role: Role): void {
    this.onEdit.emit(role);
  }

  public delete(roleId: number): void {
    this.onDelete.emit(roleId);
  }

  public undelete(roleId: number): void {
    this.onUndelete.emit(roleId);
  }
}
