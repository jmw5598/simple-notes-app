import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { createTopic, getAllTopics } from '@sn/core/store/actions';
import { Topic } from '@sn/shared/models';
import { fadeAnimation, showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';
import { selectCreateTopicResponseMessage } from '@sn/core/store/selectors';
import { setCreateTopicResponseMessage } from '@sn/core/store/actions';
import { buildTopicFormGroup } from '../../components/topic-form/topic-form.builder';

@Component({
  selector: 'sn-create-topics',
  templateUrl: './create-topics.component.html',
  styleUrls: ['./create-topics.component.scss'],
  animations: [fadeAnimation, showHide]
})
export class CreateTopicsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
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
    this.form = buildTopicFormGroup(this._formBuilder);
  }

  public submit(topic: Topic): void {
    const { id, ...newTopic } = topic;
    this._store.dispatch(createTopic({ topic: newTopic as Topic }));
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
