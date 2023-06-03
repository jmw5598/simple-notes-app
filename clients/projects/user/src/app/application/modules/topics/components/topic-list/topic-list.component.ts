import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-user-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicListComponent implements OnInit {

  @Input()
  topics: Topic[];

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public delete(id: number) {
    this.onDelete.emit(id);
  }

  public create(): void {
    this.onCreate.emit();
  }
}
