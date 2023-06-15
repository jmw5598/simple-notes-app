import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListItemComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `flex flex-col justify-center items-start p-4 ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
