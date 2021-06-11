import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IFlashcardsState } from '@sn/user/application/modules/flashcards/store/reducers';
import { ResponseMessage } from '@sn/user/core/models';
import { showHide } from '@sn/user/shared/animations';
import { Observable, Subject } from 'rxjs';
import { DrawerService } from '../drawer/drawer.service';

import * as flashcardActions from '@sn/user/application/modules/flashcards/store/actions';
import * as flashcardSelectors from '@sn/user/application/modules/flashcards/store/selectors';
import { debounce, debounceTime, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { FlashcardSet } from '@sn/user/shared/models';

@Component({
  selector: 'sn-user-flashcard-set-create',
  templateUrl: './flashcard-set-create.component.html',
  styleUrls: ['./flashcard-set-create.component.scss'],
  animations: [showHide]
})
export class FlashcardSetCreateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();
  public form: FormGroup;

  public flashcardSetBuilder$: Observable<FlashcardSet>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _drawerService: DrawerService,
    private _formBuilder: FormBuilder,
    private _store: Store<IFlashcardsState>
  ) { }

  ngOnInit(): void {
    this.initializeFlashcardSetBuilderForm();
    this.selectState();
    this.syncFlashcardSetBuilderStateWithForm();
    this.syncFormChangesWithFlashcardState();
  }

  public onClose(): void {
    this._drawerService.close();
  }

  public onSubmit(formValue: any): void {
    const flashcardSet: FlashcardSet = {
      ...formValue,
      flashcards: formValue.flashcards.map(flashcard => ({
        ...flashcard,
        id: flashcard.id > 0 ? flashcard.id : null
      }))
    } as FlashcardSet;
    this._store.dispatch(flashcardActions.createFlashcardSet({
      flashcardSet: flashcardSet
    }));
  }

  private initializeFlashcardSetBuilderForm(): void {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      flashcards: this._formBuilder.array([])
    });
  }

  private selectState(): void {
    this.flashcardSetBuilder$ = this._store.select(flashcardSelectors.selectFlashcardSetBuilder);
    this.responseMessage$ = this._store.select(flashcardSelectors.selectCreateFlashcardSetResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(flashcardActions.setCreateFlashcardSettResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  private syncFormChangesWithFlashcardState(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        withLatestFrom(this.flashcardSetBuilder$),
        filter(([values, flashcardSetBuilder]) => {
          return flashcardSetBuilder.title !== values.title
            || flashcardSetBuilder.synopsis !== values.synopsis
        })
      )
      .subscribe(([values, flashcardBuilderSet]) => {
        this._store.dispatch(flashcardActions.setFlashcardSetBuilder({
          flashcardSetBuilder: {
            ...flashcardBuilderSet,
            title: values.title,
            synopsis: values.synopsis
          }
        }));
      })
  }

  private syncFlashcardSetBuilderStateWithForm(): void {
    this._store.select(flashcardSelectors.selectFlashcardSetBuilder)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(flashcardSet => {
        this.patchInputFieldValuesToForm(flashcardSet);
        this.patchFlashcardsToForm(flashcardSet);
      });
  }

  private patchInputFieldValuesToForm(flashcardSet: FlashcardSet): void {
    this.form.patchValue({ ...flashcardSet });
  }

  private patchFlashcardsToForm(flashcardSet: FlashcardSet): void {
    const flashcardsArray = this._formBuilder.array([]);
    flashcardSet.flashcards
      .forEach(flashcard => {
        const control = this._formBuilder.group({
        id: [flashcard.id, [Validators.required]],
        frontContent: [flashcard.frontContent, [Validators.required]],
        backContent: [flashcard.backContent, [Validators.required]]
      })
      flashcardsArray.push(control);
    });
    this.form.setControl('flashcards', flashcardsArray);
  }

  ngOnDestroy(): void {
    this._store.dispatch(flashcardActions.setFlashcardSetBuilder({ flashcardSetBuilder: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
