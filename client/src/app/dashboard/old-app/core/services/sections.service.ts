import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Section } from '../../shared/model/section.model';
import { SectionResource } from '../../shared/model/section-resource.model';

@Injectable()
export class SectionsService {

  private base: string = "http://localhost:8080/v1/topics/";

  constructor(private http: HttpClient) { }

  findAll(topicId: number): Observable<Section[]> {
    return this.http.get<Section[]>(this.base + topicId + "/sections");
  }

  findById(topicId: number, sectionId: number): Observable<SectionResource> {
    return this.http.get<SectionResource>(this.base + topicId + "/sections/" + sectionId);
  }

  create(topicId: number, section: Section): Observable<SectionResource> {
    return this.http.post<SectionResource>(this.base + topicId + "/sections/", section);
  }

  update(
    topicId: number, sectionId: number, section: Section): Observable<SectionResource> {
    return this.http.put<SectionResource>(this.base + topicId + "/sections/" + sectionId, section);
  }

  delete(topicId: number, sectionId: number): Observable<any> {
    return this.http.delete(this.base + topicId + "/sections/" + sectionId);
  }

}
