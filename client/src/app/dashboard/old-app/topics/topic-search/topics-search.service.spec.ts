import { TestBed, inject } from '@angular/core/testing';

import { TopicsSearchService } from './topics-search.service';

describe('TopicsSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicsSearchService]
    });
  });

  it('should be created', inject([TopicsSearchService], (service: TopicsSearchService) => {
    expect(service).toBeTruthy();
  }));
});
