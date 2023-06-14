import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sn-form-label,label[sn-form-label],div[sn-form-label],span[sn-form-label]',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFormLabelComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `text-gray-500 text-xs mb-1 ps-1 ${this.snExtraClasses}`;
  }

  @Input()
  public snExtraClasses: string = '';
}
