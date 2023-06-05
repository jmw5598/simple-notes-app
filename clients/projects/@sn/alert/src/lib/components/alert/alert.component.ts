import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type SnAlertColor = 
  | 'primary'
  | 'secondary'
  | 'info' 
  | 'warning' 
  | 'danger' 
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone' 
  | 'red' 
  | 'orange' 
  | 'amber' 
  | 'yellow' 
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue' 
  | 'indigo' 
  | 'violet' 
  | 'purple' 
  | 'fuchsia' 
  | 'pink' 
  | 'rose';

@Component({
  selector: 'sn-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnAlertComponent {
  private _baseAlertClasses: string = 'block w-full rounded-xl p-4 mb-4';

  @HostBinding('class')
  public get hostClasses(): string {
    const alertColorClasses: string = this._generateAlertColorClasses();
    return `${this._baseAlertClasses} ${alertColorClasses} ${this.snExtraClasses}`;
  }

  @Input()
  public snTitle: string | null | undefined;

  @Input()
  public snMessage: string | null | undefined;

  @Input()
  public snColor: SnAlertColor | string = 'primary';

  @Input()
  public snExtraClasses: string = '';

  private _generateAlertColorClasses(): string {
    return `bg-${this.snColor}-100 text-${this.snColor}-700`
  }
}
