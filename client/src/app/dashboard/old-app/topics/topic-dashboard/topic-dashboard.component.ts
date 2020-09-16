import { Component, OnInit } from '@angular/core';

import { TopicsService } from '../../core/services/topics.service';

import { Topic } from '../../shared/model/topic.model';

@Component({
  selector: 'sn-topic-dashboard',
  templateUrl: './topic-dashboard.component.html',
  styleUrls: ['./topic-dashboard.component.css']
})
export class TopicDashboardComponent implements OnInit {

  constructor(private topicsService: TopicsService) { }

  topics: Topic[];

  ngOnInit() {
    this.retrieveTopics();
  }

  onDelete(id: number) {
    this.topicsService.delete(id)
      .subscribe(
        data => this.retrieveTopics(),
        error => console.log("error deleting topic with id: " + id)
      )
  }

  private retrieveTopics() {
    this.topicsService.findAllTopics()
      .subscribe(
        data => {this.topics = data; console.log(this.topics)},
        error => console.log(error)
      );
  }

}
