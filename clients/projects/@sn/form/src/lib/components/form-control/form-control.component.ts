import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';

export type SnFormControlType = 'pill' | 'rounded';

@Component({
  selector: 'sn-form-control,input[sn-form-control],textarea[sn-form-control],select[sn-form-control],div[sn-form-control],span[sn-form-control]',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFormControlComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `border py-2 px-4 bg-white text-sm focus:outline-none focus:border-gray-400 text-gray-700 ${this.snType === 'pill' ? 'rounded-full' : 'rounded-xl'} ${this.snExtraClasses}`;
  }

  @Input()
  public snType: SnFormControlType = 'pill'

  @Input()
  public snExtraClasses: string = '';
}
