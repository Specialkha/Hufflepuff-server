import { TestBed } from '@angular/core/testing';

import { HttpCommentService } from './httpComment.service';

describe('HttpCommentService', () => {
  let service: HttpCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
