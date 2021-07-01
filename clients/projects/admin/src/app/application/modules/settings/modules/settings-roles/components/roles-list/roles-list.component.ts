import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from '@sn/shared/models';

@Component({
  selector: 'sn-admin-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  @Input()
  public roles: Role[];

  @Output()
  public onEdit: EventEmitter<Role> = new EventEmitter<Role>();

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  public edit(role: Role): void {
    this.onEdit.emit(role);
  }

  public delete(roleId: number): void {
    this.onDelete.emit(roleId);
  }
}
