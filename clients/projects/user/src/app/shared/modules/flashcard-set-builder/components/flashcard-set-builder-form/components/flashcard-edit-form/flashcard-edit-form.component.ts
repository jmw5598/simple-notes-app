import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/user/core/defaults';
import { SnFlashcardSetBuilderService } from '../../../../services/flashcard-set-builder.service';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';
import { Flashcard } from '@sn/shared/models';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sn-user-flashcard-edit-form',
  templateUrl: './flashcard-edit-form.component.html',
  styleUrls: ['./flashcard-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFlashcardEditFormComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly idGenerator: Generator = idGenerator;
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public form: UntypedFormGroup
  public frontCard: string = '';
  public backCard: string = '';
  public editorOptions: any = {...DEFAULT_EDITOR_OPTIONS};

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _flashcardSetBuilderService: SnFlashcardSetBuilderService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.syncFormWithStore());
  }

  public onSubmit(formValue: any): void {
    const flashcard: Flashcard = {
      ...formValue
    } as Flashcard;
    this._flashcardSetBuilderService.updateFlashcard(flashcard);
    this._flashcardSetBuilderService.setFlashcardBeingEdited(null);
  }

  public onCancel(): void {
    this._flashcardSetBuilderService.setFlashcardBeingEdited(null);
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      id: ['', [Validators.required]],
      frontContent: ['', [Validators.required]],
      backContent: ['', [Validators.required]]
    })
  }

  private syncFormWithStore(): void {
    this._flashcardSetBuilderService.onFlashcardBeingEditedChanges()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(flashcard => this.form.patchValue({
        ...flashcard
      }));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
