import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnToasterModule } from '@sn/toaster';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <sn-toaster location="bottomright"></sn-toaster>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    SnToasterModule,
  ]
})
export class AppComponent { }
