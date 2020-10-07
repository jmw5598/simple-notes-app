import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Section } from '@sn/shared/models';

@Component({
  selector: 'sn-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
  @Input()
  public sections: Section[];

  @Output()
  public onDelete: EventEmitter<number>;

  constructor() {
    this.onDelete = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  public delete(sectionId: number): void {
    this.onDelete.emit(sectionId);
  }
}
