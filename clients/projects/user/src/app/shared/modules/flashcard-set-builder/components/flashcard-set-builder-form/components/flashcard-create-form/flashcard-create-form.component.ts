import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/user/core/defaults';
import { SnFlashcardSetBuilderService } from '../../../../services/flashcard-set-builder.service';
import { Flashcard } from '@sn/shared/models';

import { idGenerator } from '@sn/user/shared/utils/id-generator.util';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sn-user-flashcard-create-form',
  templateUrl: './flashcard-create-form.component.html',
  styleUrls: ['./flashcard-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFlashcardCreateFormComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private readonly idGenerator: Generator = idGenerator;

  public form: UntypedFormGroup;
  public frontCard: string = '';
  public backCard: string = '';
  public editorOptions: any = {...DEFAULT_EDITOR_OPTIONS};

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _flashcardSetBuilderService: SnFlashcardSetBuilderService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      frontContent: ['', [Validators.required]],
      backContent: ['', [Validators.required]]
    });

    this.form.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(250))
      .subscribe((value) => this._changeDetectorRef.markForCheck())
  }

  public onSubmit(formValue: any): void {
    console.log("usbmitting", formValue);
    const flashcard: Flashcard = {
      ...formValue,
      id: -this.idGenerator.next().value
    } as Flashcard;
    this._flashcardSetBuilderService.addFlashcard(flashcard);
    this.onReset();
  }

  public onReset(): void {
    this.form.patchValue({
      frontContent: '',
      backContent: ''
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
