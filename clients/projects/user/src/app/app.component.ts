import { Component } from '@angular/core';
import { OnDemandPreloadService } from '@sn/core/framing';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <sn-toaster location="bottomright"></sn-toaster>
  `,
  styles: [``]
})
export class AppComponent { }
