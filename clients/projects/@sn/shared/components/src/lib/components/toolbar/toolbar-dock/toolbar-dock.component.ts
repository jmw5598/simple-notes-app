import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type ToolbarDockLocation = 'top' | 'bottom';
export type ToolbarDockTogglerLocation = 'start' | 'end' | 'center';

@Component({
  selector: 'sn-toolbar-dock',
  templateUrl: './toolbar-dock.component.html',
  styleUrls: ['./toolbar-dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDockComponent {
  @HostBinding('class.toolbar-dock')
  public toolbarDock: boolean = true;

  @Input()
  @HostBinding('class.hidden')
  public isHidden: boolean = false;

  @Input()
  public togglerText: string = '';

  @Input()
  public togglerLocation: ToolbarDockTogglerLocation = 'start';

  @Input()
  public dockLocation: ToolbarDockLocation = 'bottom';

  @Input()
  @HostBinding('class.toolbar-dock-toggler-location-start')
  public get toolbarDockTogglerLocationStart(): boolean {
    return this.togglerLocation === 'start';
  }

  public set toolbarDockTogglerLocationStart(value: boolean) {
    if (value) {
      this.togglerLocation = 'start';
    }
  }

  @Input()
  @HostBinding('class.toolbar-dock-toggler-location-end')
  public get toolbarDockTogglerLocationEnd(): boolean {
    return this.togglerLocation === 'end';
  }

  public set toolbarDockTogglerLocationEnd(value: boolean) {
    if (value) {
      this.togglerLocation = 'end';
    }
  }

  @Input()
  @HostBinding('class.toolbar-dock-toggler-location-center')
  public get toolbarDockTogglerLocationCenter(): boolean {
    return this.togglerLocation === 'center';
  }

  public set toolbarDockTogglerLocationCenter(value: boolean) {
    if (value) {
      this.togglerLocation = 'center';
    }
  }
  
  @Input()
  @HostBinding('class.toolbar-dock-location-top')
  public get toolbarDockLocationTop(): boolean {
    return this.dockLocation === 'top';
  }

  public set toolbarDockLocationTop(value: boolean) {
    if (value) {
      this.dockLocation = 'top';
    }
  }

  @Input()
  @HostBinding('class.toolbar-dock-location-bottom')
  public get toolbarDockLocationBottom(): boolean {
    return this.dockLocation === 'bottom';
  }

  public set toolbarDockLocationBottom(value: boolean) {
    if (value) {
      this.dockLocation = 'bottom';
    }
  }
}
