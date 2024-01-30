import { TestBed } from '@angular/core/testing';

import { SewOutService } from './sew-out.service';

describe('SewOutService', () => {
  let service: SewOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SewOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
