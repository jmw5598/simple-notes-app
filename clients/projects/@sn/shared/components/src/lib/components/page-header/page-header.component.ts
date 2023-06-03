import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sn-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input()
  public heading: string;
}
