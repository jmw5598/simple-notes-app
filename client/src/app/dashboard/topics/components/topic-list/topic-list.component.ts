import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  @Input()
  topics: Topic[];

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

}
