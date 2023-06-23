import { Component } from '@angular/core';
import { SnButtonsModule } from '@sn/button';

@Component({
  selector: 'sn-admin-auth-marketing',
  templateUrl: './auth-marketing.component.html',
  styleUrls: ['./auth-marketing.component.scss'],
  standalone: true,
  imports: [
    SnButtonsModule,
  ]
})
export class AuthMarketingComponent { }
