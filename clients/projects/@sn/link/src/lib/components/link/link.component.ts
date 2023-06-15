import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type SnLinkColor = 
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

export type SnLinkSize = 
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

@Component({
  selector: 'sn-link,a[sn-link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnLinkComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `cursor-pointer text-${this.snSize} text-primary-500 hover:text-primary-700 ${this.snExtraClasses}`;
  }

  @Input()
  public snColor: SnLinkColor = 'primary';

  @Input()
  public snSize: SnLinkSize = 'md'

  @Input()
  public snExtraClasses: string = '';
}
