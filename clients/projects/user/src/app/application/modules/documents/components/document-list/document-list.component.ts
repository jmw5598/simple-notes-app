import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Document } from '@sn/shared/models';

@Component({
  selector: 'sn-user-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent {
  @Input()
  public documents: Document[];

  @Output()
  public onDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onView: EventEmitter<Document> = new EventEmitter<Document>();

  @Output()
  public onEdit: EventEmitter<Document> = new EventEmitter<Document>();

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>();

  public create(): void {
    this.onCreate.emit();
  }

  public view(document: Document): void {
    this.onView.emit(document);
  }

  public edit(document: Document): void {
    this.onEdit.emit(document);
  }

  public delete(documentId: number): void {
    this.onDelete.emit(documentId);
  }
}
