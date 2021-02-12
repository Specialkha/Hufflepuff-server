import { TestBed } from '@angular/core/testing';

import { HttpBlogService } from './httpBlog.service';

describe('HttpService', () => {
  let service: HttpBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
