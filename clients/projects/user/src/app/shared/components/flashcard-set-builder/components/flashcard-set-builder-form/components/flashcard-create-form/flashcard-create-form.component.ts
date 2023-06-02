import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/user/core/defaults';
import { FlashcardSetBuilderService } from '@sn/user/shared/components/flashcard-set-builder/services/flashcard-set-builder.service';
import { Flashcard } from '@sn/shared/models';

import { idGenerator } from '@sn/user/shared/utils/id-generator.util';

@Component({
  selector: 'sn-user-flashcard-create-form',
  templateUrl: './flashcard-create-form.component.html',
  styleUrls: ['./flashcard-create-form.component.scss']
})
export class FlashcardCreateFormComponent implements OnInit {
  private readonly idGenerator: Generator = idGenerator;

  public form: UntypedFormGroup;
  public frontCard: string = '';
  public backCard: string = '';
  public editorOptions: any = {...DEFAULT_EDITOR_OPTIONS};

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _flashcardSetBuilderService: FlashcardSetBuilderService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      frontContent: ['', [Validators.required]],
      backContent: ['', [Validators.required]]
    })
  }

  public onSubmit(formValue: any): void {
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
      backContetn: ''
    });
  }
}
