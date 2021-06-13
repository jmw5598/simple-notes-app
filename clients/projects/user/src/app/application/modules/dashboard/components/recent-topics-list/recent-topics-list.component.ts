import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '@sn/user/shared/models';

@Component({
  selector: 'sn-user-recent-topics-list',
  templateUrl: './recent-topics-list.component.html',
  styleUrls: ['./recent-topics-list.component.scss']
})
export class RecentTopicsListComponent implements OnInit {
  @Input()
  public topics: Topic[];

  constructor() { }

  ngOnInit(): void {
  }
}