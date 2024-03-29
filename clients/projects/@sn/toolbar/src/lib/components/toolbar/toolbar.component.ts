import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'sn-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnToolbarComponent {
  @HostBinding('class')
  public hostClasses: string = 'flex w-full overflow-x-hidden hover:overflow-x-auto border-b';
}
