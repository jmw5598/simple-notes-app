import { Component, OnInit, Input } from '@angular/core';
import { RegistrationResult } from '@sn/core/dtos';

@Component({
  selector: 'sn-registration-result',
  templateUrl: './registration-result.component.html',
  styleUrls: ['./registration-result.component.scss']
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
