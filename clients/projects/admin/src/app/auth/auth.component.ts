import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from '@sn/shared/animations';
import { AuthMarketingComponent } from './components/auth-marketing/auth-marketing.component';

@Component({
  selector: 'sn-admin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AuthMarketingComponent,
    RouterOutlet,
  ]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
