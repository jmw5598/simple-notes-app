import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'span[snToolbarButton],div[snToolbarButton],button[snToolbarButton],input[snToolbarButton]',
  templateUrl: './toolbar-button.component.html',
  styleUrls: ['./toolbar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButtonComponent {
  @HostBinding('class')
  public hostClasses: string = 'flex flex-col justify-center items-center cursor-pointer border-r last:border-r-0 hover:bg-gray-50 hover:first:rounded-l-full hover:last:rounded-r-full h-full hover:color-gray-400'
}
