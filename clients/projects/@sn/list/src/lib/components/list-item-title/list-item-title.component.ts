import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sn-list-item-title',
  templateUrl: './list-item-title.component.html',
  styleUrls: ['./list-item-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListItemTitleComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `flex flex-row justify-between items-center w-full text-md text-primary-500 p-0 m-0 mb-1 ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';

  @Input()
  public snExtraContent: TemplateRef<void> | null | undefined;
}
