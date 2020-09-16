import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Category } from '../../shared/model/category.model';
import { Permission } from '../../shared/model/permission.enum';
import { Topic } from '../../shared/model/topic.model';
import { TopicsService } from '../../core/services/topics.service';

@Component({
  selector: 'sn-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.css']
})
export class TopicCreateComponent implements OnInit {

  permission = Permission;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private topicsService: TopicsService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      permission: [Permission.PRIVATE, [Validators.required]],
      categories: this.formBuilder.array([])
    });
  }

  onAddCategory(category: string) {
    let categories = this.form.controls["categories"] as FormArray;
    categories.push(new FormControl(new Category(null, category)));
  }

  onRemoveCategory(category: string) {
    let categories = this.form.controls["categories"] as FormArray;
    let control = categories.controls.find(e => e.value.description === category);
    let index = categories.controls.indexOf(control);
    categories.removeAt(index);
  }

  submit(topic: Topic) {
    this.topicsService.create(topic)
      .subscribe(
        data => this.router.navigate(['../', data.topic.id], { relativeTo: this.route }),
        error => console.log("error saving new topic " + error)
      );
  }

}
