import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, ControlContainer } from '@angular/forms';

import { Permission } from '@sn/shared/models';

@Component({
  selector: 'sn-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {
  public form: FormGroup;
  public Permission = Permission;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  public onAddCategory(category: string): void {
    // let categories = this.form.controls["categories"] as FormArray;
    // categories.push(new FormControl(new Category(null, category)));
  }

  public onRemoveCategory(category: string): void {
    let categories = this.form.controls["categories"] as FormArray;
    let control = categories.controls.find(e => e.value.description === category);
    let index = categories.controls.indexOf(control);
    categories.removeAt(index);
  }
}
