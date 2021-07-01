import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Plan } from '@sn/shared/models';

@Component({
  selector: 'sn-admin-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class PlansListComponent implements OnInit {
  @Input()
  public plans: Plan[];

  @Output()
  public onEdit: EventEmitter<Plan> = new EventEmitter<Plan>();

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onUndelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public edit(plan: Plan): void {
    this.onEdit.emit(plan);
  }

  public delete(planId: number): void {
    this.onDelete.emit(planId);
  }

  public undelete(planId: number): void {
    this.onUndelete.emit(planId);
  }
}
