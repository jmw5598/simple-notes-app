import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { createTopic, getAllTopics } from '@sn/core/store/actions';
import { Router } from '@angular/router';
import { Category, Permission, Topic } from '@sn/shared/models';
import { fadeAnimation, showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';
import { selectCreateTopicResponseMessage } from '@sn/core/store/selectors';
import { setCreateTopicResponseMessage } from '@sn/core/store/actions';

@Component({
  selector: 'sn-create-topics',
  templateUrl: './create-topics.component.html',
  styleUrls: ['./create-topics.component.scss'],
  animations: [fadeAnimation, showHide]
})
export class CreateTopicsComponent implements OnInit, OnDestroy {
  public permission = Permission;
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.responseMessage$ = this._store.select(selectCreateTopicResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          this._resetForm();
          setTimeout(() => this._store.dispatch(setCreateTopicResponseMessage(null)), 3000);
        }
      })
    );
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      permission: [Permission.PRIVATE, [Validators.required]],
      categories: this._formBuilder.array([])
    });
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

  public submit(topic: Topic): void {
    this._store.dispatch(createTopic({ topic: topic }));
  }

  private _resetForm(): void {
    const categories: FormArray = this._formBuilder.array([]);
    this.form.setControl('categories', categories);
    this.form.reset();

  }

  ngOnDestroy(): void {
    this._store.dispatch(getAllTopics());
  }
}
