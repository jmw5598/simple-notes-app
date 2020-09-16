import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/model/category.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicsSearchService } from '../../core/services/topics-search.service';

@Component({
  selector: 'sn-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.css']
})
export class TopicSearchComponent implements OnInit, OnDestroy {

  private categoriesSubscription: Subscription;
  private resultsSubscription: Subscription;

  categories: Category[];
  results: Topic[];
  tags: string[] = [];

  constructor(private topicsSearchService: TopicsSearchService) {

  }

  ngOnInit() {

    this.categoriesSubscription = this.topicsSearchService.categories
      .subscribe(
        data => {
          this.categories = data;
          let tags: string[] = [];
          this.categories.forEach(e => tags.push(e.description));
          this.tags = tags;
        },
        error => console.log("error subscribing to topic search categories")
      );

    this.resultsSubscription = this.topicsSearchService.results
      .subscribe(
        data => this.results = data,
        error => console.log("error subscribing to topic search results")
      );

  }

  search() {
    this.topicsSearchService.search()
  }

  onRemove(tag: string) {
    this.topicsSearchService.removeCategory(tag);
    this.topicsSearchService.search();
    console.log(tag);
  }

  onAdd(tag: string) {
    this.topicsSearchService.addCategory(tag);
    this.topicsSearchService.search();
    console.log(tag);
  }

  ngOnDestroy() {
    if(this.categoriesSubscription)
      this.categoriesSubscription.unsubscribe();
    if(this.resultsSubscription)
      this.resultsSubscription.unsubscribe();
  }

}
