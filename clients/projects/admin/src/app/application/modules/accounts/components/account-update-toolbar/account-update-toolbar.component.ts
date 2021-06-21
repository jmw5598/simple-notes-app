import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-admin-account-update-toolbar',
  templateUrl: './account-update-toolbar.component.html',
  styleUrls: ['./account-update-toolbar.component.scss']
})
export class AccountUpdateToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public resendValidationEmail(): void {
    console.log('resending validation email');
  }
}
