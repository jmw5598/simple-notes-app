import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-todo-list-details',
  templateUrl: './todo-list-details.component.html',
  styleUrls: ['./todo-list-details.component.scss']
})
export class TodoListDetailsComponent implements OnInit {
  @Input()
  public todoList: TodoList;

  constructor() { }

  ngOnInit(): void {
  }

}
