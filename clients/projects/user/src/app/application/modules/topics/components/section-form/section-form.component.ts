import { Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'sn-user-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {
  public form: UntypedFormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }
}
