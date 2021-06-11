import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Flashcard } from '@sn/user/shared/models';
import { Observable, Subject } from 'rxjs';
import { FlashcardSetBuilderService } from '../../services/flashcard-set-builder.service';

@Component({
  selector: 'sn-user-flashcard-set-builder-form',
  templateUrl: './flashcard-set-builder-form.component.html',
  styleUrls: ['./flashcard-set-builder-form.component.scss']
})
export class FlashcardSetBuilderFormComponent implements OnInit {
  public form: FormGroup;

  public flashcardBeingEdited$: Observable<Flashcard>;

  constructor(
    private _parentControl: ControlContainer,
    private _flashcardSetBuilderService: FlashcardSetBuilderService
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
    this.flashcardBeingEdited$ = this._flashcardSetBuilderService.onFlashcardBeingEditedChanges();
  }
}
