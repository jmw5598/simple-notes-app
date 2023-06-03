import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-user-recent-topics-list',
  templateUrl: './recent-topics-list.component.html',
  styleUrls: ['./recent-topics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTopicsListComponent {
  @Input()
  public topics: Topic[];
}
