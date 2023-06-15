import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-list-item-footer',
  templateUrl: './list-item-footer.component.html',
  styleUrls: ['./list-item-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListItemFooterComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `block w-full border-top text-gray-500 mb-0 pt-1 flex items-center border-t border-dotted ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
