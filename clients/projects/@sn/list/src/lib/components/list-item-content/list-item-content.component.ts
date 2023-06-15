import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-list-item-content',
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListItemContentComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `block w-full text-gray-700 py-1 mt-1 border-t border-dotted text-sm ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
