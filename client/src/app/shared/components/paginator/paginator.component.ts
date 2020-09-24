import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Page, IPageable } from '@sn/core/models';

@Component({
  selector: 'sn-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input()
  public page: Page<any>;

  @Output()
  public onNextPage: EventEmitter<IPageable>;

  @Output()
  public onPreviousPage: EventEmitter<IPageable>;

  @Output()
  public onGoToPage: EventEmitter<IPageable>;

  constructor() {
    this.onNextPage = new EventEmitter<IPageable>();
    this.onPreviousPage = new EventEmitter<IPageable>();
    this.onGoToPage = new EventEmitter<IPageable>();
  }

  ngOnInit(): void {
  }

  public nextPage(): void {
    if (this.page && this.page.next) {
      this.onNextPage.emit(this.page.next);
    }
  }

  public previousPage(): void {
    if (this.page && this.page.next) {
      this.onPreviousPage.emit(this.page.previous);
    }
  }

  public goToPage(pageNumber: number): void {
    // TODO
    this.onGoToPage.emit(null);
  }
}
