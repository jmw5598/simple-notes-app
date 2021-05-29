import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.scss']
})
export class TodoListViewComponent implements OnInit {

  constructor(
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
  }

  public onSave(): void {
    
  }

  public onCancel(): void {
    this._drawerService.close();
  }

}
