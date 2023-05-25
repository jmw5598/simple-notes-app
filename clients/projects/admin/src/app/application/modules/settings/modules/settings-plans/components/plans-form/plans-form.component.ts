import { Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'sn-admin-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrls: ['./plans-form.component.scss']
})
export class PlansFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(
    private _controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
  }
}
