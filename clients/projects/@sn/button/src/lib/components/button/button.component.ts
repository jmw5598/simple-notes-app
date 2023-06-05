import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type SnButtonColor = 
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

export type SnButtonType = 
  | 'solid' 
  | 'outline' 
  | 'blank';

export type SnButtonSize = 
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';


@Component({
  selector: 'sn-button,input[sn-button],button[sn-button],a[sn-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnButtonComponent {
  private _baseButtonClasses: string = 
    'flex justify-center items-center rounded-full cursor-pointer transition-colors focus:outline-none focus-visible:outline-none active:outline-none'
  @Input()
  public snColor: SnButtonColor | string = 'primary';

  @Input()
  public snType: SnButtonType = 'solid';

  @Input()
  public snSize: SnButtonSize = 'md';

  @Input()
  public snExtraClasses: string = '';

  @HostBinding('class')
  public get hostClasses(): string {
    const textColorClasses: string = this._generateTextColorClasses();
    const backgroundColorClasses: string = this._generateBackgroundColorClasses();
    const sizeClasses: string = this._generateSizeClasses();
    const hoverClasses: string = this._generateHoverClasses();
    const borderClasses: string = this._generatBorderClasses();
    return `${this._baseButtonClasses} ${borderClasses} ${textColorClasses} ${backgroundColorClasses} ${hoverClasses} ${sizeClasses} ${this.snExtraClasses}`;
  }

  private _generateTextColorClasses(): string {
    return `text-${this.snType === 'solid' ? 'white' : this.snColor + '-500'}`;
  }

  private _generateBackgroundColorClasses(): string {
    return `bg-${this.snType === 'solid' ? this.snColor + '-500' : 'transparent'}`;
  }

  private _generateHoverClasses(): string {
    if (this.snType === 'blank') return `hover:text-${this.snColor}-700`;
    return `hover:bg-${this.snType === 'solid' ? 'white' : this.snColor + '-500'} hover:text-${this.snType === 'solid' ? this.snColor + '-500' : 'white'}`;
  }

  private _generatBorderClasses(): string {
    if (this.snType === 'blank') return '';
    return `border border-${this.snColor}-500`
  }

  private _generateSizeClasses(): string {
    switch(this.snSize) {
      case 'sm': return `text-xs ${this.snType === 'blank' ? 'p-0' : 'px-2 py-1'}`;
      case 'md': return `text-xs ${this.snType === 'blank' ? 'p-0' : 'px-4 py-2'}`;
      case 'lg': return `text-sm ${this.snType === 'blank' ? 'p-0' : 'px-4 py-2'}`;
      case 'xl': return `text-md ${this.snType === 'blank' ? 'p-0' : 'px-4 py-2'}`;
      default: return 'text-xs px-4 py-2';
    }
  }
}
