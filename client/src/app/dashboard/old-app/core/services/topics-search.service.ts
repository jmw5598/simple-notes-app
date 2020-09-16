import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../../shared/model/category.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicsService } from '../../core/services/topics.service';

@Injectable()
export class TopicsSearchService {

  private _categories: Category[] = [];
  private _results: Topic[] = [];

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private resultsSubject = new BehaviorSubject<Topic[]>([]);

  public categories = this.categoriesSubject.asObservable();
  public results = this.resultsSubject.asObservable();

  constructor(private topicsService: TopicsService) {}

  search() {
    this.topicsService.search(this._categories)
      .subscribe(
        data => {
          this._results = data;
          this.resultsSubject.next(this._results);
        },
        error => console.log("error searching for categories inside topics search service")
      )
  }

  addCategory(category: string) {
    this._categories.push(new Category(null, category));
    this.categoriesSubject.next(this._categories);
  }

  removeCategory(category: string) {
    this._categories.forEach( (item, index) => {
      if(item.description === category) this._categories.splice(index, 1);
    });
    this.categoriesSubject.next(this._categories);
    if(this._categories.length === 0) {
      this._results = [];
      this.resultsSubject.next(this._results);
    }
  }

  clearCategories() {
    this._categories = [];
    this.categoriesSubject.next(this._categories);
    this._results = [];
    this.resultsSubject.next(this._results);
  }

}
