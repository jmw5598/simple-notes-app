import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.scss']
})
export class TopicSearchComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      searchTerms: ['', [Validators.required]]
    })
  }

  public onSearch(value: any): void {
    console.log('Search.....');
  }
}
