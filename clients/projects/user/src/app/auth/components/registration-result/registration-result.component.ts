import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RegistrationResult } from '@sn/shared/models';

@Component({
  selector: 'sn-user-registration-result',
  templateUrl: './registration-result.component.html',
  styleUrls: ['./registration-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationResultComponent implements OnInit {
  @Input()
  public result: RegistrationResult; 

  constructor() { }

  ngOnInit(): void {

  }

  public isSuccess(): boolean {
    return this.result && this.result.status.trim().toUpperCase() === 'SUCCESS'
  }
}
