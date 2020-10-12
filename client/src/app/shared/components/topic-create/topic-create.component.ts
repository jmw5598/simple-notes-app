import { Component, OnInit } from '@angular/core';
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
import { buildTopicFormGroup } from '../../forms/topic-form/topic-form.builder';

@Component({
  selector: 'sn-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss'],
  animations: [showHide]
})
export class TopicCreateComponent implements OnInit {
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
          setTimeout(() => this._store.dispatch(setCreateTopicResponseMessage({ message: null })), 3000);
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
}
