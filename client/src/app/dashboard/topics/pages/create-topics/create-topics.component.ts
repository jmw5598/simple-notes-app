import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { createTopic, getAllTopics, getAllTopicsSuccess } from '@sn/core/store/actions';
import { Router } from '@angular/router';
import { Category, Permission, Topic } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-create-topics',
  templateUrl: './create-topics.component.html',
  styleUrls: ['./create-topics.component.scss'],
  animations: [fadeAnimation]
})
export class CreateTopicsComponent implements OnInit, OnDestroy {

  permission = Permission;
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      permission: [Permission.PRIVATE, [Validators.required]],
      categories: this._formBuilder.array([])
    });
  }

  public onAddCategory(category: string): void {
    let categories = this.form.controls["categories"] as FormArray;
    categories.push(new FormControl(new Category(null, category)));
  }

  public onRemoveCategory(category: string): void {
    let categories = this.form.controls["categories"] as FormArray;
    let control = categories.controls.find(e => e.value.description === category);
    let index = categories.controls.indexOf(control);
    categories.removeAt(index);
  }

  public submit(topic: Topic): void {
    this._store.dispatch(createTopic({ topic: topic }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(getAllTopics());
  }
}
