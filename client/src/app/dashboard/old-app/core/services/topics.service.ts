import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Category } from '../../shared/model/category.model';
import { FileResponse } from './file-response.model';
import { FileType } from '../../shared/model/file-type.enum';
import { Section } from '../../shared/model/section.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicResource } from '../../shared/model/topic-resource.model';

@Injectable()
export class TopicsService {

  private base: string = "http://localhost:8080/v1/topics/"

  constructor(private http: HttpClient) {}

  findAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.base);
  }

  findById(id: number): Observable<TopicResource> {
    return this.http.get<TopicResource>(this.base + id);
  }

  create(topic: Topic): Observable<TopicResource> {
    return this.http.post<TopicResource>(this.base, topic);
  }

  delete(id: number) {
    return this.http.delete(this.base + id);
  }

  export(topicId: number, fileType: FileType): Observable<FileResponse> {
    return this.http.get(this.base + topicId + "/export?format=" + fileType, { responseType: 'blob', observe: 'response'})
      .map(d => this.extractFile(d));
  }

  search(categories: Category[]) {
    return this.http.get<Topic[]>(this.base + "search?categories=" + this.generateSearchString(categories));
  }

  protected extractFile(res: Response | any) {
    const header = res.headers.get('Content-Disposition');
    const filename = header.substring(header.indexOf('filename'), header.length).split("=")[1];
    const blob: Blob = res.body;
    return new FileResponse(blob, filename);
  }

  private generateSearchString(categories: Category[]) {
    let result = [];
    categories.forEach((c) => result.push(c.description));
    return result.join(",");
  }

}
