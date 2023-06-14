import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

export type SnSectionTitleColor = 
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

export type SnSectionHeaderDirectionality = 'normal' | 'reverse';

export type SnSectionHeaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

@Component({
  selector: 'sn-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnSectionHeaderComponent {
  @HostBinding('class')
  public get hostClasses(): string {
    return `m-0 px-4 py-3 flex items-center justify-between ${this.snExtraClasses} ${this.snDirectionality === 'reverse' ? 'flex-row-reverse' : 'flex-row'}`;
  }

  @Input()
  public snTitle: string = '';

  @Input()
  public snColor: SnSectionTitleColor = 'primary';

  @Input()
  public snSize: SnSectionHeaderSize = 'xl';

  @Input()
  public snDirectionality: SnSectionHeaderDirectionality = 'normal';

  @Input()
  public snExtraClasses: string = '';

  @Input()
  public snExtraContent: TemplateRef<any> | null | undefined;
}
