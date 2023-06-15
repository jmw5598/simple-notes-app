import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-list-item-subtitle',
  templateUrl: './list-item-subtitle.component.html',
  styleUrls: ['./list-item-subtitle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListItemSubtitleComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `block w-full text-gray-600 italic text-xs p-0 m-0 mb-1 ${this.snExtraClasses}`
  }

  @Input()
  public snExtraClasses: string = '';
}
