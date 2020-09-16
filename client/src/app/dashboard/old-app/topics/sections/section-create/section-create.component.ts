import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Section } from '../../../shared/model/section.model';
import { SectionsService } from '../../../core/services/sections.service';

@Component({
  selector: 'sn-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.css']
})
export class SectionCreateComponent implements OnInit {

  private params: Subscription
  form: FormGroup;
  topicId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sectionsService: SectionsService
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required]
    })

    this.params = this.route.params
      .subscribe(
        params => this.topicId = +params['id']
      );

  }

  submit(section: Section) {
    this.sectionsService.create(this.topicId, section)
      .subscribe(
        data => this.router.navigate(['../', data.section.id], { relativeTo: this.route}),
        error => console.log("error creating new sections for topic id: " + this.topicId)
      );
  }

  ngOnDestroy() {
    if(this.params)
      this.params.unsubscribe();
  }

}
