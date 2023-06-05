import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'sn-toolbar-button-group',
  templateUrl: './toolbar-button-group.component.html',
  styleUrls: ['./toolbar-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnToolbarButtonGroupComponent {
  @HostBinding('class')
  public hostClasses: string = 'flex flex-row rounded-full justify-center items-center border my-2 mx-2';
}
