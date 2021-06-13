import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todo-list-progress',
  templateUrl: './todo-list-progress.component.html',
  styleUrls: ['./todo-list-progress.component.scss']
})
export class TodoListProgressComponent implements OnInit {
  @Input()
  public todoList: TodoList;

  constructor() { }

  ngOnInit(): void {
  }

  public get completedPercent(): number {
    return Math.round(this.todoList?.todos?.filter(t => t.isComplete).length / this.todoList?.todos?.length * 100) || 0;
  }

  public get classProgress(): string {
    const progress: number = this.completedPercent;
    return progress === 100 
      ? 'bg-success' 
      : progress >= 66
        ? 'bg-info' 
        : progress >= 33
          ? 'bg-warning' 
          : 'bg-danger';
  }
}
