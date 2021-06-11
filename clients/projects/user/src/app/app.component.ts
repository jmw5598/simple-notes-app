import { Component } from '@angular/core';
import { OnDemandPreloadService } from '@sn/core/framing';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <sn-user-toaster location="bottomright"></sn-user-toaster>
  `,
  styles: [``]
})
export class AppComponent { }
