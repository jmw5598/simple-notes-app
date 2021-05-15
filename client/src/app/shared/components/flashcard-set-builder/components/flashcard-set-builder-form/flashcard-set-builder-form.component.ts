import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_EDITOR_OPTIONS } from '@sn/core/defaults';
import { EditorOption } from 'angular-markdown-editor';

@Component({
  selector: 'sn-flashcard-set-builder-form',
  templateUrl: './flashcard-set-builder-form.component.html',
  styleUrls: ['./flashcard-set-builder-form.component.scss']
})
export class FlashcardSetBuilderFormComponent implements OnInit {
  public form: FormGroup;
  

  constructor(
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  public onSubmit(formValue: any): void {
    console.log('submittings form', formValue);
  }
}
