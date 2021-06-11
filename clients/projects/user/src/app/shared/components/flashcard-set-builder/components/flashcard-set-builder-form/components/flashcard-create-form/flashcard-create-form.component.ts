import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/core/defaults';
import { FlashcardSetBuilderService } from '@sn/shared/components/flashcard-set-builder/services/flashcard-set-builder.service';
import { Flashcard } from '@sn/shared/models';
import { EditorOption } from 'angular-markdown-editor';

import { idGenerator } from '@sn/shared/utils/id-generator.util';

@Component({
  selector: 'sn-flashcard-create-form',
  templateUrl: './flashcard-create-form.component.html',
  styleUrls: ['./flashcard-create-form.component.scss']
})
export class FlashcardCreateFormComponent implements OnInit {
  private readonly idGenerator: Generator = idGenerator;

  public form: FormGroup;
  public frontCard: string = '';
  public backCard: string = '';
  public editorOptions: EditorOption = {...DEFAULT_EDITOR_OPTIONS};

  constructor(
    private _formBuilder: FormBuilder,
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
