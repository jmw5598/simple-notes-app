import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todo-list-progress',
  templateUrl: './todo-list-progress.component.html',
  styleUrls: ['./todo-list-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListProgressComponent {
  @Input()
  public todoList: TodoList;

  public get completedPercent(): number {
    return Math.round(this.todoList?.todos?.filter(t => t.isComplete).length / this.todoList?.todos?.length * 100) || 0;
  }

  public get classProgress(): string {
    const progress: number = this.completedPercent;
    return progress === 100 
      ? 'bg-primary-400' 
      : progress >= 66
        ? 'bg-info-400' 
        : progress >= 33
          ? 'bg-warning-400' 
          : 'bg-danger-400';
  }
}
