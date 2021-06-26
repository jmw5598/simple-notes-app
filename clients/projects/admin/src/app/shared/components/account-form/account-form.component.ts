import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Plan } from '@sn/shared/models';

@Component({
  selector: 'sn-admin-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public plans: Plan[] = [];

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as FormGroup;    
  }
}