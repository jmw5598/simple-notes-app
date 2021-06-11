import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Section } from '@sn/user/shared/models';

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

  @Output()
  public onCreate: EventEmitter<void>;

  constructor() {
    this.onDelete = new EventEmitter<number>();
    this.onEdit = new EventEmitter<Section>();
    this.onCreate = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  public delete(sectionId: number): void {
    this.onDelete.emit(sectionId);
  }

  public edit(section: Section): void {
    this.onEdit.emit(section);
  }

  public create(): void {
    this.onCreate.emit();
  }
}
