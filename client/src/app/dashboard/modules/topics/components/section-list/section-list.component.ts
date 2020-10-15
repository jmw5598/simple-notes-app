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

  @Output()
  public onEdit: EventEmitter<Section>;

  constructor() {
    this.onDelete = new EventEmitter<number>();
    this.onEdit = new EventEmitter<Section>();
  }

  ngOnInit(): void {
  }

  public delete(sectionId: number): void {
    this.onDelete.emit(sectionId);
  }

  public edit(section: Section): void {
    this.onEdit.emit(section);
  }
}
