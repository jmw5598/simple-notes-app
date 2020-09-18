import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '@sn/shared/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  constructor(private _http: HttpClient) { }

  public save(topicId: number, section: Section): Observable<Section> {
    return this._http.post<Section>(
      `${environment.api.baseUrl}/topics/${topicId}/sections`,
      section
    );
  }

  public delete(topicId: number, sectionId: number): Observable<Section> {
    return this._http.delete<Section>(
      `${environment.api.baseUrl}/topics/${topicId}/sections/${sectionId}`
    );
  }

  // public update(id: ID, t: T): Observable<T>;
  // public findOne(id: ID): Observable<T>;
  // public findAll(): Observable<T[]>  
}
