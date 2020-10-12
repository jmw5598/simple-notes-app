import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { updateTopic, getAllTopics } from '@sn/core/store/actions';
import { Topic } from '@sn/shared/models';
import { fadeAnimation, showHide } from '@sn/shared/animations';
import { ResponseMessage } from '@sn/core/models';
import { selectUpdateTopicResponseMessage, selectSelectedTopic } from '@sn/core/store/selectors';
import { setUpdateTopicResponseMessage } from '@sn/core/store/actions';
import { buildTopicFormGroup } from '@sn/shared/forms';

@Component({
  selector: 'sn-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.scss'],
  animations: [fadeAnimation, showHide]
})
export class UpdateTopicComponent implements OnInit {
public form: FormGroup;
  public topic$: Observable<Topic>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.topic$ = this._store.select(selectSelectedTopic).pipe(
      tap((topic: Topic) => {
        if (topic) {
          this.form.patchValue(topic);
        }
      })
    );

    this.responseMessage$ = this._store.select(selectUpdateTopicResponseMessage).pipe(
      tap((message: ResponseMessage) => {
        if (message) {
          setTimeout(() => this._store.dispatch(setUpdateTopicResponseMessage(null)), 3000);
        }
      })
    );
    this.form = buildTopicFormGroup(this._formBuilder);
  }

  public submit(topic: Topic): void {
    this._store.dispatch(updateTopic({ 
      id: topic.id, 
      topic: topic 
    }));
  }

  private _resetForm(): void {
    const categories: FormArray = this._formBuilder.array([]);
    this.form.setControl('categories', categories);
    this.form.reset();
  }
}
