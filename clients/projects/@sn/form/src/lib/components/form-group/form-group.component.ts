import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-form-group,div[sn-form-group],span[sn-form-group]',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFormGroupComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `flex flex-col justify-center grow shrink ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
