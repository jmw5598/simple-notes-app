import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnListComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
