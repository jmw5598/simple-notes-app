import { Component, OnInit, AfterViewInit, Renderer2, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, ControlContainer } from '@angular/forms';
import { TagInputComponent } from '@sn/shared/components';

import { Permission } from '@sn/shared/models';

@Component({
  selector: 'sn-user-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicFormComponent implements OnInit, AfterViewInit {
  @ViewChild(TagInputComponent, { static: true })
  public tagInputComponent!: TagInputComponent;

  public form: UntypedFormGroup;
  public Permission = Permission;

  constructor(
    private _renderer: Renderer2,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    })
  }

  public onAddCategory(category: string): void {
    // let categories = this.form.controls["categories"] as FormArray;
    // categories.push(new FormControl(new Category(null, category)));
  }

  public onRemoveCategory(category: string): void {
    let categories = this.form.controls["categories"] as UntypedFormArray;
    let control = categories.controls.find(e => e.value.description === category);
    let index = categories.controls.indexOf(control);
    categories.removeAt(index);
  }

  public reset(): void {
    this.tagInputComponent?.reset();
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }
}
