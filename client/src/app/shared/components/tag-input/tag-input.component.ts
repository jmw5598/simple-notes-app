import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  public form: FormGroup;

  @Output()
  onAdd: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onRemove: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  items: string[] = [];

  @Input()
  separators: string[] = [',', ' ', 'Tab'];

  @Input()
  tagStyle: string = "badge badge-light";

  @Input()
  formControlStyle: string = "form-control-borderless";

  @Input()
  maxTagCount: number = 5;

  @Input()
  placeholder: string = "Search tags";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required]
    });
  }

  onKeyup(event) {
    if(this.separators.find((x) => x === event.key)) {
      let value = this.form.controls["tag"].value;
      let tag = value.substring(0, value.length-1).replace(/[^A-Za-z0-9]/g, "");
      if(tag.length > 0)
        this.add(tag);
      else
        this.form.reset();
    }
  }

  onKeydown(event) {
    let value = this.form.controls["tag"].value;
    if(event.key === "Backspace"){
      if(this.items.length > 0 && !value) {
        let lastItem = this.items[this.items.length-1];
        this.remove(lastItem);
        this.form.controls["tag"].setValue(lastItem);
      }
    }
  }

  add(tag: string) {
    tag = tag.toLowerCase();
    this.items.push(tag);
    this.onAdd.emit(tag);
    this.form.reset();
  }

  remove(tag: string) {
    tag = tag.toLowerCase();
    let index = this.items.indexOf(tag);
    if(index > -1) this.items.splice(index, 1);
    this.onRemove.emit(tag);
  }

}
