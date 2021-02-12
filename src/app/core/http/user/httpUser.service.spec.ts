import { TestBed } from '@angular/core/testing';

import { HttpUserService } from './httpUser.service';

describe('HttpService', () => {
  let service: HttpUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
